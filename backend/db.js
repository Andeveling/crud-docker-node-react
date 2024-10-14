const sqlite3 = require("sqlite3").verbose();

// Abrir la conexión a la base de datos SQLite (crea el archivo si no existe)
const db = new sqlite3.Database("./todo.db", (err) => {
	if (err) {
		console.error("Error al conectar con la base de datos:", err);
	} else {
		console.log("Conectado a la base de datos SQLite");
		// Crear la tabla si no existe
		db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT DEFAULT 'pendiente'
            )
        `);
	}
});

// Función para ejecutar consultas
db.query = (sql, params = []) => new Promise((resolve, reject) => {
		db.all(sql, params, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve([rows]);
			}
		});
	});

module.exports = db;
