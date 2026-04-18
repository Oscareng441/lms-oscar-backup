<?php
// 🔥 CONFIGURACIÓN DB
$host = "localhost";
$dbname = "u682985581_esf";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Conectado a la base de datos<br>";
} catch (PDOException $e) {
    die("❌ Error de conexión: " . $e->getMessage());
}

// 📥 FUNCION PARA LEER CSV
function readCSV($file) {
    $rows = [];
    if (($handle = fopen($file, "r")) !== FALSE) {
        $headers = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== FALSE) {

            if (count($headers) === count($data)) {
                $rows[] = array_combine($headers, $data);
            } else {
                echo "⚠️ Fila ignorada por columnas incorrectas:<br>";
                print_r($data);
                echo "<br><br>";
            }
        }
        fclose($handle);
    }
    return $rows;
}

// 📊 LEER ARCHIVOS
$problems = readCSV("problems.csv");
$answers = readCSV("answers.csv");
$hints = readCSV("hints.csv");

// 🔗 MAPA external_id → problem_id
$problemMap = [];

echo "🚀 Insertando problemas...<br>";

// 🔥 INICIAR TRANSACCIÓN
$pdo->beginTransaction();

try {

    // 🧩 INSERTAR PROBLEMAS
    foreach ($problems as $p) {

        // 🚫 EVITAR DUPLICADOS
        $exists = $pdo->prepare("SELECT id FROM problems WHERE problem_text = ?");
        $exists->execute([$p['problem_text']]);

        if ($exists->fetch()) {
            echo "⚠️ Problema duplicado: {$p['external_id']}<br>";
            continue;
        }

        // ✅ INSERT
        $stmt = $pdo->prepare("
            INSERT INTO problems 
            (name, lesson_id, problem_type_id, display_type, owner_id, sequence_id, is_premium, problem_text, credit_id, active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $p['name'],
            $p['lesson_id'],
            $p['problem_type_id'],
            $p['display_type'],
            $p['owner_id'],
            $p['sequence_id'],
            $p['is_premium'],
            $p['problem_text'],
            $p['credit_id'],
            $p['active']
        ]);

        $problem_id = $pdo->lastInsertId();
        $problemMap[$p['external_id']] = $problem_id;

        echo "✔ Problema {$p['external_id']} insertado con ID $problem_id<br>";
    }

    // 🧠 INSERTAR RESPUESTAS
    echo "🧠 Insertando respuestas...<br>";

    foreach ($answers as $a) {

        // 🔒 Validar que exista el problema
        if (!isset($problemMap[$a['external_id']])) continue;

        $stmt = $pdo->prepare("
            INSERT INTO answer_sets 
            (problem_id, display_type, answer_text, active, is_correct)
            VALUES (?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $problemMap[$a['external_id']],
            $a['display_type'],
            $a['answer_text'],
            $a['active'],
            $a['is_correct']
        ]);

        echo "✔ Respuesta para {$a['external_id']}<br>";
    }

    // 💡 INSERTAR PISTAS
    echo "💡 Insertando pistas...<br>";

    foreach ($hints as $h) {

        // 🔒 Validar que exista el problema
        if (!isset($problemMap[$h['external_id']])) continue;

        $stmt = $pdo->prepare("
            INSERT INTO problem_hints 
            (problem_id, hint, sequence_id)
            VALUES (?, ?, ?)
        ");

        $stmt->execute([
            $problemMap[$h['external_id']],
            $h['hint'],
            $h['sequence_id']
        ]);

        echo "✔ Pista para {$h['external_id']}<br>";
    }

    // ✅ TODO BIEN → GUARDAR
    $pdo->commit();
    echo "🎉 ¡Importación completa!";

} catch (Exception $e) {

    // ❌ ERROR → DESHACER TODO
    $pdo->rollBack();
    echo "❌ Error: " . $e->getMessage();
}