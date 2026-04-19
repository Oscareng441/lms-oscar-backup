<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Importador CSV</title>
</head>
<body>

<h1>Importador de Problemas</h1>

<form method="POST" action="/importador/preview">
    @csrf

    <h3>Problems CSV</h3>
    <textarea name="problems" rows="10" style="width:100%">{{ old('problems') }}</textarea>

    <h3>Answers CSV</h3>
    <textarea name="answers" rows="10" style="width:100%">{{ old('answers') }}</textarea>

    <h3>Hints CSV</h3>
    <textarea name="hints" rows="10" style="width:100%">{{ old('hints') }}</textarea>

    <br><br>
    <button type="submit">Preview</button>
</form>

<hr>

{{-- 🔴 DEBUG VISUAL --}}
@if(session('debug'))
    <h3 style="color:red;">DEBUG</h3>
    <pre>{{ print_r(session('debug'), true) }}</pre>
@endif

{{-- ❌ ERRORES --}}
@if(!empty($errors))
    <h3 style="color:red;">Errores:</h3>
    <ul>
        @foreach($errors as $e)
            <li>{{ $e }}</li>
        @endforeach
    </ul>
@endif

{{-- ✅ PREVIEW --}}
@if(isset($preview) && !empty($preview['problems']))
    <h2>Preview</h2>

    <p><strong>Problemas:</strong> {{ count($preview['problems']) }}</p>
    <p><strong>Respuestas:</strong> {{ count($preview['answers']) }}</p>
    <p><strong>Pistas:</strong> {{ count($preview['hints']) }}</p>

    {{-- 🔥 PREVIEW DETALLADO --}}
    @foreach($preview['problems'] as $p)

        <hr>

        <h3>🧩 Problema: {{ $p['external_id'] }}</h3>

        <p><strong>Pregunta:</strong></p>
        <div style="margin-bottom:10px;">
            {!! $p['problem_text'] !!}
        </div>

        {{-- RESPUESTAS --}}
        <p><strong>Opciones:</strong></p>
        <ul>
            @foreach($preview['answers'] as $a)
                @if($a['external_id'] == $p['external_id'])
                    <li>
                        {{ $a['answer_text'] }}

                        @if(isset($a['is_correct']) && $a['is_correct'])
                            <span style="color:green;"> ✅ (Correcta)</span>
                        @else
                            <span style="color:#999;"> (Distractor)</span>
                        @endif
                    </li>
                @endif
            @endforeach
        </ul>

        {{-- HINTS --}}
        <p><strong>Hints:</strong></p>
        <ol>
            @foreach($preview['hints'] as $h)
                @if($h['external_id'] == $p['external_id'])
                    <li>
                        <strong>[{{ $h['sequence_id'] }}]</strong>
                        {!! $h['hint'] !!}
                    </li>
                @endif
            @endforeach
        </ol>

    @endforeach

    {{-- 🚀 IMPORTAR --}}
    <form method="POST" action="/importador/import">
        @csrf
        <input type="hidden" name="data" value="{{ json_encode($preview) }}">
        <button type="submit" style="padding:10px 20px; font-size:16px;">
            🚀 Importar
        </button>
    </form>
@endif

</body>
</html>