<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Importador CSV</title>

<style>
body { font-family: Arial; background:#f7f7f7; margin:20px; }
.card { background:white; padding:15px; border-radius:10px; margin-bottom:20px; box-shadow:0 2px 6px rgba(0,0,0,.1);}
.duplicate { border-left:5px solid #dc3545; }
.new { border-left:5px solid #28a745; }
.hint-box { padding:8px; border-radius:6px; margin-bottom:5px;}
</style>

</head>
<body>

<h1>📥 Importador</h1>

<form method="POST" action="/importador/preview">
@csrf

<h3>Problems CSV</h3>
<textarea name="problems" rows="6" style="width:100%">{{ old('problems') }}</textarea>

<h3>Answers CSV</h3>
<textarea name="answers" rows="6" style="width:100%">{{ old('answers') }}</textarea>

<h3>Hints CSV</h3>
<textarea name="hints" rows="6" style="width:100%">{{ old('hints') }}</textarea>

<br><br>
<button>🔍 Preview</button>
</form>

<hr>

@if(isset($preview))

<form method="POST" action="/importador/import">
@csrf

<input type="hidden" name="data" value="{{ json_encode($preview) }}">

<h2>Preview</h2>

@foreach($preview['problems'] as $p)

@php
$existing = DB::table('problems')
->whereRaw('LOWER(TRIM(problem_text)) = ?', [strtolower(trim($p['problem_text']))])
->first();
@endphp

<div class="card {{ $existing ? 'duplicate' : 'new' }}">

<h3>🧩 {{ $p['external_id'] }}</h3>

<p><strong>Pregunta nueva:</strong></p>
<div>{!! $p['problem_text'] !!}</div>

@if($existing)
    <p style="color:red;"><strong>⚠️ Problema ya existe</strong></p>

    <p><strong>Pregunta existente:</strong></p>
    <div style="background:#f1f1f1;padding:10px;border-radius:6px;">
        {!! $existing->problem_text !!}
    </div>

    <label>
        <input type="checkbox" name="actions[{{ $p['external_id'] }}]" value="update">
        🔄 Actualizar (borrar anterior y reemplazar)
    </label>

    <br>

    <label>
        <input type="checkbox" name="skip[{{ $p['external_id'] }}]">
        ⛔ Omitir este problema
    </label>

@else

    <p style="color:green;"><strong>✅ Nuevo problema</strong></p>

    <label>
        <input type="checkbox" name="actions[{{ $p['external_id'] }}]" value="insert" checked>
        ➕ Insertar problema
    </label>

    <br>

    <label>
        <input type="checkbox" name="skip[{{ $p['external_id'] }}]">
        ⛔ No insertar
    </label>

@endif

<hr>

{{-- RESPUESTAS --}}
<p><strong>Respuestas:</strong></p>
<ul>
@foreach($preview['answers'] as $a)
@if($a['external_id'] == $p['external_id'])
<li>
{{ $a['answer'] ?? $a['answer_text'] }}

@if(isset($a['is_correct']) && $a['is_correct'])
<span style="color:green;">✅</span>
@endif

</li>
@endif
@endforeach
</ul>

{{-- HINTS --}}
<p><strong>Pistas:</strong></p>

@foreach($preview['hints'] as $h)
@if($h['external_id'] == $p['external_id'])

@php
$text = str_replace(['\\[','\\]','\\text{','}'],'',$h['hint']);
@endphp

<div class="hint-box" style="background:#eee;">
💡 {{ $text }}
</div>

@endif
@endforeach

</div>

@endforeach

<button style="padding:12px;font-size:16px;">🚀 Ejecutar Importación</button>

</form>

@endif

</body>
</html>