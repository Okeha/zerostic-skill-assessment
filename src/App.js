import { useEffect, useState } from "react";
import { database } from "./config/firebase";
import { ref, onValue } from "firebase/database";
import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { sortAscending, sortDescending } from "./helper/helper";

function App() {
  const [employees, setEmployees] = useState([]);

  const [pagination, setPagination] = useState(15);
  const [allEmployees, setAllEmployees] = useState([]);

  const [sort, setSort] = useState("ASC");

  const fetchData = async () => {
    // const snapshot = await database.
    // const data = snapshot.val();
    const employeeRef = ref(database, "employees");
    onValue(employeeRef, (snapshot) => {
      const data = snapshot.val();
      setEmployees(data);
      setAllEmployees(data);
    });
  };
  useEffect(() => {
    const getEmployees = async () => {
      await fetchData();
    };
    getEmployees();
  }, []);

  const displayNumber = async (e) => {
    const val = e.target.value;
    console.log(val);
    setPagination(val);

    let employeeData = allEmployees;
    let newData = employeeData.slice(0, val);
    // console.log(employeeData);
    setEmployees(newData);
  };

  const handleSort = () => {
    let sortedArr;
    if (sort === "ASC") {
      sortedArr = sortAscending(employees);
      setSort("DESC");
    } else if (sort === "DESC") {
      sortedArr = employees.reverse();
      setSort("ASC");
    }
    setEmployees(sortedArr);
  };

  return (
    <div className="App">
      <div
        className="ui blue segment raised"
        style={{ height: "50px", borderRadius: 0, marginBottom: "30px" }}
      >
        {" "}
      </div>

      <div className="ui container">
        <Typography variant="body">
          Please Click on arrow to Sort By Name:
        </Typography>
        <div
          className="ui segment raised"
          style={{
            // borderRadius: 0,
            height: "500px",
            padding: "30px",
            marginBottom: "30px",
            overflow: "scroll",
          }}
        >
          {" "}
          <Typography variant="p">Pagination</Typography>
          <div style={{ marginBottom: "10px" }} />
          <TextField select defaultValue={15} onChange={displayNumber}>
            <MenuItem value={0}>--Select Filteration Number</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </TextField>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">
                      Name{" "}
                      <i
                        className={
                          sort === "DESC"
                            ? "fas fa-arrow-up"
                            : "fas fa-arrow-down"
                        }
                        onClick={handleSort}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Age</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Gender</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Email</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Typography variant="h5">No Items Found...</Typography>
                    <Typography>Ensure to click a valid number</Typography>
                  </div>
                )}
                {employees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {employee[`${Object.keys(employee)[0]}`].name}
                    </TableCell>
                    <TableCell>
                      {employee[`${Object.keys(employee)[0]}`].age}
                    </TableCell>
                    <TableCell>
                      {employee[`${Object.keys(employee)[0]}`].gender}
                    </TableCell>
                    <TableCell>
                      {employee[`${Object.keys(employee)[0]}`].email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
