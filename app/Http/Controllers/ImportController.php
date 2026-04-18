<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImportController extends Controller
{
    public function index()
    {
        return view('importador');
    }

    public function preview(Request $request)
    {
        // 🔴 DEBUG
        session()->flash('debug', $request->all());

        // 🔹 Parse CSV
        $problems = $this->parseCSV($request->problems);
        $answers = $this->parseCSV($request->answers);
        $hints = $this->parseCSV($request->hints);

        // 🔥 GUARDAR EN SESIÓN (IMPORTANTE)
        session([
            'problems_csv' => $problems,
            'answers_csv' => $answers,
            'hints_csv' => $hints,
        ]);

        $errors = [];

        if (empty($problems)) $errors[] = "Problems vacío";
        if (empty($answers)) $errors[] = "Answers vacío";
        if (empty($hints)) $errors[] = "Hints vacío";

        $problemIds = collect($problems)->pluck('external_id');

        foreach ($answers as $a) {
            if (!isset($a['external_id'])) continue;

            if (!$problemIds->contains($a['external_id'])) {
                $errors[] = "Respuesta sin problema: " . $a['external_id'];
            }
        }

        foreach ($hints as $h) {
            if (!isset($h['external_id'])) continue;

            if (!$problemIds->contains($h['external_id'])) {
                $errors[] = "Hint sin problema: " . $h['external_id'];
            }
        }

        return view('importador', [
            'preview' => compact('problems','answers','hints'),
            'errors' => $errors
        ]);
    }

    public function import(Request $request)
    {
        /**
         * 🔥 PRIORIDAD:
         * 1. Intentar desde JSON (tu flujo actual)
         * 2. Si no existe → usar SESSION (fix del bug)
         */

        $data = json_decode($request->data, true);

        if (!$data) {
            // 🔥 fallback a sesión
            $data = [
                'problems' => session('problems_csv'),
                'answers' => session('answers_csv'),
                'hints' => session('hints_csv'),
            ];
        }

        // 🚨 Validación fuerte
        if (
            empty($data['problems']) ||
            empty($data['answers']) ||
            empty($data['hints'])
        ) {
            return back()->with('error', '❌ Datos vacíos (ni JSON ni SESSION)');
        }

        DB::beginTransaction();

        try {

            $problemMap = [];

            foreach ($data['problems'] as $p) {

                $exists = DB::table('problems')
                    ->whereRaw('LOWER(TRIM(problem_text)) = ?', [strtolower(trim($p['problem_text']))])
                    ->first();

                if ($exists) {
                    $problemMap[$p['external_id']] = $exists->id;
                    continue;
                }

                $id = DB::table('problems')->insertGetId([
                    'name' => $p['name'],
                    'lesson_id' => $p['lesson_id'],
                    'problem_type_id' => $p['problem_type_id'],
                    'display_type' => $p['display_type'],
                    'owner_id' => $p['owner_id'],
                    'sequence_id' => $p['sequence_id'],
                    'is_premium' => $p['is_premium'],
                    'problem_text' => $p['problem_text'],
                    'credit_id' => $p['credit_id'],
                    'active' => $p['active']
                ]);

                $problemMap[$p['external_id']] = $id;
            }

            foreach ($data['answers'] as $a) {
                if (!isset($problemMap[$a['external_id']])) continue;

                DB::table('answer_sets')->insert([
                    'problem_id' => $problemMap[$a['external_id']],
                    'display_type' => $a['display_type'],
                    'answer_text' => $a['answer_text'],
                    'active' => $a['active'],
                    'is_correct' => $a['is_correct']
                ]);
            }

            foreach ($data['hints'] as $h) {
                if (!isset($problemMap[$h['external_id']])) continue;

                DB::table('problem_hints')->insert([
                    'problem_id' => $problemMap[$h['external_id']],
                    'hint' => $h['hint'],
                    'sequence_id' => $h['sequence_id']
                ]);
            }

            DB::commit();

            // 🔥 LIMPIAR SESIÓN
            session()->forget([
                'problems_csv',
                'answers_csv',
                'hints_csv'
            ]);

            return redirect('/importador')
                ->with('success', '🎉 Importación exitosa')
                ->with('preview', null)
                ->with('errors', null);

        } catch (\Exception $e) {
            DB::rollBack();
            return "❌ Error: " . $e->getMessage();
        }
    }

    private function parseCSV($text)
    {
        if (!$text) return [];

        $lines = preg_split('/\r\n|\r|\n/', trim($text));

        $rows = array_map(function ($line) {
            return str_getcsv($line);
        }, $lines);

        if (count($rows) < 2) return [];

        $header = array_map('trim', array_shift($rows));

        $data = [];

        foreach ($rows as $row) {

            if (count(array_filter($row)) === 0) continue;

            if (count($row) !== count($header)) continue;

            $assoc = array_combine($header, $row);

            if (!isset($assoc['external_id']) || trim($assoc['external_id']) === '') continue;

            $data[] = $assoc;
        }

        return $data;
    }
}