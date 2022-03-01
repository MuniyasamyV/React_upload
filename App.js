import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import "./styles.css";
import QrScan from "react-qr-reader";
export default function App() {
  const [name, setName] = useState("");
  const [regNumber, setRegisterNumber] = useState();
  const [year, setYear] = useState(1);
  const [sem, setSem] = useState([1, 2]);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [sec, setSec] = useState("");
  const [stuphone, setStuphone] = useState();
  const [parentphone, setParentphone] = useState();
  const [img, setImg] = useState();
  const webcamRef = useRef(null);
  const [qrscan, setQrscan] = useState("No result");

  useEffect(() => {
    if (year === 1) setSem([1, 2]);
    else if (year === 2) setSem([3, 4]);
    else if (year === 3) setSem([5, 6]);
    else setSem([7, 8]);
  }, [year]);

  const handleNameChange = (value) => {
    setName(value.replace(/[^A-Za-z ]/gi, ""));
  };
  function handleDepartment(value) {
    setDepartment(value);
  }
  function handleSec(value) {
    setSec(value);
  }
  const handleRegisterNumber = (value) => {
    if (value.length <= 12) setRegisterNumber(value);
  };

  const handleStudentphone = (value) => {
    if (value.length <= 10) setStuphone(value);
  };

  const handleParentphone = (value) => {
    if (value.length <= 10) setParentphone(value);
  };

  const captureImage = () => {
    setImg(webcamRef.current.getScreenshot());
  };

  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log({
      name,
      regNumber,
      year,
      sem,
      email,
      department,
      sec,
      stuphone,
      parentphone
    });
  }
  return (
    <div className="App">
      <h1>STUDENT REGISTRATION</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <lable htmlFor="name">Student Name</lable>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="none"
            value={name}
            required
            placeholder="Enter Your Name"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="regNumber">RegisterNumber</label>
          <input
            type="number"
            name="regNumber"
            id="regNumber"
            required
            autoComplete="none"
            value={regNumber}
            placeholder="Enter Your Register"
            onChange={(e) => handleRegisterNumber(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="year">Year</label>
          <select
            name="year"
            id="year"
            required
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            <option value="1">1st year</option>
            <option value="2">2st year</option>
            <option value="3">3st year</option>
            <option value="4">4st year</option>
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="sem">Semester</label>
          <select required name="sem" id="sem">
            {sem.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="stuphone">StuNumber</label>
          <input
            type="number"
            name="stuphone"
            id="stuphone"
            required
            autoComplete="none"
            value={stuphone}
            placeholder="Enter your Phone"
            onChange={(e) => handleStudentphone(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="parentphone">ParentNumber</label>
          <input
            type="number"
            name="parentphone"
            id="parentphone"
            required
            autoComplete="none"
            value={parentphone}
            placeholder="Enter your Phone"
            onChange={(e) => handleParentphone(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            required
            value={department}
            onChange={(e) => handleDepartment(e.target.value)}
          >
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="BME">BME</option>
          </select>
        </div>

        <div className="form-item">
          <label htmlFor="sec">Section</label>
          <select
            name="sec"
            id="sec"
            required
            value={sec}
            onChange={(e) => handleSec(e.target.value)}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>
        <input className="submit" type="submit" value="submit" />
      </form>

      <Webcam ref={webcamRef} />
      <button onClick={() => captureImage()}>Capture Image</button>
      <img src={img} alt="webcam image" />
      <span>QR Scanner</span>
      <h1>{qrscan}</h1>
      <center>
        <div style={{ marginTop: 30 }}>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 320 }}
          />
        </div>
      </center>
    </div>
  );
}
