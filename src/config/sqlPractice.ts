export interface SqlPracticeRule {
  label: string;
  pattern: string;
}

export interface SqlPracticeTable {
  name: string;
  columns: string[];
}

export interface SqlPracticeExercise {
  id: string;
  type: 'select' | 'where' | 'order' | 'join' | 'group' | 'having';
  title: string;
  level: string;
  prompt: string;
  tables: SqlPracticeTable[];
  starter: string;
  solution: string;
  expectedSql: string;
  required: SqlPracticeRule[];
  forbidden: SqlPracticeRule[];
  hints: string[];
}

export const sqlPracticeSetupSql = `
CREATE TABLE Clientes (
  IdCliente INTEGER PRIMARY KEY,
  Nombre TEXT NOT NULL,
  Ciudad TEXT NOT NULL
);

CREATE TABLE Productos (
  IdProducto INTEGER PRIMARY KEY,
  Nombre TEXT NOT NULL,
  Precio INTEGER NOT NULL
);

CREATE TABLE Productos_Adquiridos (
  IdProducto INTEGER NOT NULL,
  IdCliente INTEGER NOT NULL,
  Producto TEXT NOT NULL
);

CREATE TABLE Ventas (
  IdVenta INTEGER PRIMARY KEY,
  Cliente TEXT NOT NULL,
  Producto TEXT NOT NULL,
  Cantidad INTEGER NOT NULL
);

INSERT INTO Clientes (IdCliente, Nombre, Ciudad) VALUES
  (1, 'Ana', 'Montevideo'),
  (2, 'Bruno', 'Canelones'),
  (3, 'Camila', 'Montevideo'),
  (4, 'Diego', 'Maldonado');

INSERT INTO Productos (IdProducto, Nombre, Precio) VALUES
  (1, 'Notebook', 1200),
  (2, 'Mouse', 25),
  (3, 'Teclado', 80),
  (4, 'Monitor', 450);

INSERT INTO Productos_Adquiridos (IdProducto, IdCliente, Producto) VALUES
  (1, 1, 'Notebook'),
  (2, 1, 'Mouse'),
  (3, 2, 'Teclado'),
  (4, 3, 'Monitor');

INSERT INTO Ventas (IdVenta, Cliente, Producto, Cantidad) VALUES
  (1, 'Ana', 'Notebook', 1),
  (2, 'Ana', 'Mouse', 2),
  (3, 'Bruno', 'Teclado', 1),
  (4, 'Camila', 'Monitor', 1),
  (5, 'Camila', 'Mouse', 1);
`;

export const sqlPracticeExercises: SqlPracticeExercise[] = [
  {
    id: 'select-clientes',
    type: 'select',
    title: 'SELECT básico',
    level: 'Principiante',
    prompt:
      'Mostrá el nombre y la ciudad de todos los clientes de la tabla Clientes.',
    tables: [
      {
        name: 'Clientes',
        columns: ['IdCliente', 'Nombre', 'Ciudad'],
      },
    ],
    starter: 'SELECT\n  \nFROM Clientes;',
    solution: 'SELECT Nombre, Ciudad\nFROM Clientes;',
    expectedSql: 'SELECT Nombre, Ciudad\nFROM Clientes;',
    required: [
      { label: 'Usar SELECT', pattern: '\\bselect\\b' },
      { label: 'Consultar la tabla Clientes', pattern: '\\bfrom\\s+clientes\\b' },
      { label: 'Mostrar la columna Nombre', pattern: '\\bnombre\\b' },
      { label: 'Mostrar la columna Ciudad', pattern: '\\bciudad\\b' },
    ],
    forbidden: [
      {
        label: 'Evitá SELECT * para este ejercicio',
        pattern: '\\bselect\\s+\\*',
      },
    ],
    hints: [
      'Empezá escribiendo SELECT y nombrá solo las columnas pedidas.',
      'La tabla correcta es Clientes.',
      'No necesitás WHERE porque la consigna pide todos los clientes.',
    ],
  },
  {
    id: 'where-montevideo',
    type: 'where',
    title: 'Filtrar con WHERE',
    level: 'Principiante',
    prompt:
      'Mostrá los clientes que viven en Montevideo usando la tabla Clientes.',
    tables: [
      {
        name: 'Clientes',
        columns: ['IdCliente', 'Nombre', 'Ciudad'],
      },
    ],
    starter: 'SELECT Nombre, Ciudad\nFROM Clientes\nWHERE ;',
    solution: "SELECT Nombre, Ciudad\nFROM Clientes\nWHERE Ciudad = 'Montevideo';",
    expectedSql: "SELECT Nombre, Ciudad\nFROM Clientes\nWHERE Ciudad = 'Montevideo';",
    required: [
      { label: 'Usar SELECT', pattern: '\\bselect\\b' },
      { label: 'Consultar la tabla Clientes', pattern: '\\bfrom\\s+clientes\\b' },
      { label: 'Usar WHERE', pattern: '\\bwhere\\b' },
      { label: 'Filtrar por Ciudad', pattern: '\\bciudad\\b' },
      { label: 'Filtrar Montevideo', pattern: "['\"]?montevideo['\"]?" },
    ],
    forbidden: [
      {
        label: 'No uses SELECT * en este ejercicio',
        pattern: '\\bselect\\s+\\*',
      },
    ],
    hints: [
      'Primero consultá la tabla Clientes.',
      'WHERE sirve para quedarte solo con filas que cumplen una condición.',
      "La condición esperada es sobre Ciudad = 'Montevideo'.",
    ],
  },
  {
    id: 'order-productos',
    type: 'order',
    title: 'Ordenar resultados',
    level: 'Principiante',
    prompt:
      'Mostrá los productos ordenados desde el precio más alto al más bajo.',
    tables: [
      {
        name: 'Productos',
        columns: ['IdProducto', 'Nombre', 'Precio'],
      },
    ],
    starter: 'SELECT Nombre, Precio\nFROM Productos\nORDER BY ;',
    solution: 'SELECT Nombre, Precio\nFROM Productos\nORDER BY Precio DESC;',
    expectedSql: 'SELECT Nombre, Precio\nFROM Productos\nORDER BY Precio DESC;',
    required: [
      { label: 'Consultar Productos', pattern: '\\bfrom\\s+productos\\b' },
      { label: 'Mostrar Precio', pattern: '\\bprecio\\b' },
      { label: 'Usar ORDER BY', pattern: '\\border\\s+by\\b' },
      { label: 'Ordenar por Precio descendente', pattern: '\\bprecio\\s+desc\\b' },
    ],
    forbidden: [],
    hints: [
      'ORDER BY va después de FROM.',
      'Para ordenar de mayor a menor se usa DESC.',
      'La columna para ordenar es Precio.',
    ],
  },
  {
    id: 'join-clientes-productos',
    type: 'join',
    title: 'Relacionar tablas con JOIN',
    level: 'Intermedio',
    prompt:
      'Mostrá el nombre del cliente y el producto comprado usando Clientes y Productos_Adquiridos.',
    tables: [
      {
        name: 'Clientes',
        columns: ['IdCliente', 'Nombre'],
      },
      {
        name: 'Productos_Adquiridos',
        columns: ['IdProducto', 'IdCliente', 'Producto'],
      },
    ],
    starter:
      'SELECT\n  \nFROM Clientes\nJOIN Productos_Adquiridos\n  ON ;',
    solution:
      'SELECT Clientes.Nombre, Productos_Adquiridos.Producto\nFROM Clientes\nJOIN Productos_Adquiridos\n  ON Clientes.IdCliente = Productos_Adquiridos.IdCliente;',
    expectedSql:
      'SELECT Clientes.Nombre, Productos_Adquiridos.Producto\nFROM Clientes\nJOIN Productos_Adquiridos\n  ON Clientes.IdCliente = Productos_Adquiridos.IdCliente;',
    required: [
      { label: 'Usar JOIN', pattern: '\\bjoin\\b' },
      { label: 'Usar Clientes', pattern: '\\bclientes\\b' },
      {
        label: 'Usar Productos_Adquiridos',
        pattern: '\\bproductos_adquiridos\\b',
      },
      { label: 'Definir condición con ON', pattern: '\\bon\\b' },
      { label: 'Relacionar por IdCliente', pattern: '\\bidcliente\\b' },
    ],
    forbidden: [],
    hints: [
      'Necesitás unir Clientes con Productos_Adquiridos.',
      'La condición de unión se escribe después de ON.',
      'Ambas tablas se relacionan usando IdCliente.',
    ],
  },
  {
    id: 'group-by-ventas',
    type: 'group',
    title: 'Agrupar con GROUP BY',
    level: 'Intermedio',
    prompt:
      'Contá cuántas ventas tiene cada cliente en la tabla Ventas.',
    tables: [
      {
        name: 'Ventas',
        columns: ['IdVenta', 'Cliente', 'Producto', 'Cantidad'],
      },
    ],
    starter:
      'SELECT Cliente,\n       \nFROM Ventas\nGROUP BY Cliente;',
    solution:
      'SELECT Cliente, COUNT(*) AS TotalVentas\nFROM Ventas\nGROUP BY Cliente;',
    expectedSql:
      'SELECT Cliente, COUNT(*) AS TotalVentas\nFROM Ventas\nGROUP BY Cliente;',
    required: [
      { label: 'Consultar Ventas', pattern: '\\bfrom\\s+ventas\\b' },
      { label: 'Usar Cliente', pattern: '\\bcliente\\b' },
      { label: 'Usar COUNT', pattern: '\\bcount\\s*\\(' },
      { label: 'Agrupar por Cliente', pattern: '\\bgroup\\s+by\\s+cliente\\b' },
    ],
    forbidden: [
      {
        label: 'No uses SELECT * con GROUP BY',
        pattern: '\\bselect\\s+\\*',
      },
    ],
    hints: [
      'GROUP BY necesita una columna para formar grupos.',
      'COUNT(*) cuenta cuántas filas hay en cada grupo.',
      'Si agrupás por Cliente, el SELECT debe incluir Cliente y una función agregada.',
    ],
  },
  {
    id: 'having-ventas',
    type: 'having',
    title: 'Filtrar grupos con HAVING',
    level: 'Intermedio',
    prompt:
      'Mostrá solo los clientes que tienen más de una venta.',
    tables: [
      {
        name: 'Ventas',
        columns: ['IdVenta', 'Cliente', 'Producto', 'Cantidad'],
      },
    ],
    starter:
      'SELECT Cliente, COUNT(*) AS TotalVentas\nFROM Ventas\nGROUP BY Cliente\nHAVING ;',
    solution:
      'SELECT Cliente, COUNT(*) AS TotalVentas\nFROM Ventas\nGROUP BY Cliente\nHAVING COUNT(*) > 1;',
    expectedSql:
      'SELECT Cliente, COUNT(*) AS TotalVentas\nFROM Ventas\nGROUP BY Cliente\nHAVING COUNT(*) > 1;',
    required: [
      { label: 'Usar COUNT', pattern: '\\bcount\\s*\\(' },
      { label: 'Agrupar por Cliente', pattern: '\\bgroup\\s+by\\s+cliente\\b' },
      { label: 'Usar HAVING', pattern: '\\bhaving\\b' },
      { label: 'Filtrar más de una venta', pattern: '\\bcount\\s*\\([^)]*\\)\\s*>\\s*1' },
    ],
    forbidden: [
      {
        label: 'No reemplaces HAVING por WHERE para filtrar el grupo',
        pattern: '\\bwhere\\s+count\\s*\\(',
      },
    ],
    hints: [
      'Primero agrupá las ventas por Cliente.',
      'HAVING se usa para filtrar el resultado de un GROUP BY.',
      'La condición buscada es COUNT(*) > 1.',
    ],
  },
];
