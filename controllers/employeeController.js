const db = require("../config/db");



exports.addEmployee = async (req, res) => {
  try {
    const { name, department, salary } = req.body;


    if (!name || !department || !salary) {
  return res.status(400).json({
    message: "All fields are required"
  });
}

if (salary <= 0) {
  return res.status(400).json({
    message: "Invalid Salary"
  });
}

    const result = await db.query(
      "INSERT INTO employees(name, department, salary) VALUES($1, $2, $3) RETURNING *",
      [name, department, salary]
    );

    res.status(201).json(result.rows[0]);

  } catch(error){

   console.log(error);

   res.status(500).json({
      message: "Internal Server Error"
   });
}
};


exports.getEmployees = async (req, res) => {
  try {

    const result = await db.query(
      "SELECT * FROM employees"
    );

    res.status(200).json(result.rows);

  } catch(error){

   console.log(error);

   res.status(500).json({
      message: "Internal Server Error"
   });
}
};





exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM employees WHERE id = $1",
      [id]
    );

    res.json(result.rows[0]);

  } catch(error){

   console.log(error);

   res.status(500).json({
      message: "Internal Server Error"
   });
}
};









exports.updateEmployee = async (req, res) => {
  try {

    const { id } = req.params;

    const { name, department, salary } =
      req.body;

    const result = await db.query(
      `UPDATE employees
       SET name=$1,
           department=$2,
           salary=$3
       WHERE id=$4
       RETURNING *`,
      [name, department, salary, id]
    );

    res.json(result.rows[0]);

  } catch(error){

   console.log(error);

   res.status(500).json({
      message: "Internal Server Error"
   });
}
};





exports.deleteEmployee = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM employees WHERE id = $1",
      [id]
    );

    res.json({
      message: "Employee Deleted Successfully"
    });

  } catch(error){

   console.log(error);

   res.status(500).json({
      message: "Internal Server Error"
   });
}
};



