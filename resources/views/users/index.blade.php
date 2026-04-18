<!DOCTYPE html>
<html>
<head>
    <title>Usuarios</title>
</head>
<body>
    <h1>Lista de Usuarios</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
        </tr>
        @foreach ($users as $user)
        <tr>
            <td>{{ $user->ID }}</td>
            <td>{{ $user->display_name }}</td>
            <td>{{ $user->user_email }}</td>
        </tr>
        @endforeach
    </table>
</body>
</html>