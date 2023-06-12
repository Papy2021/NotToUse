import React, { useState, useEffect, Fragment, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "./Helper/Context.jsx";
import { Link } from "react-router-dom";

const CRUD = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const Email_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Variables for the modal-------------------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // -------------------------------------------------------------------

  //States for adding new members--------------------------------------
  const [cFullName, setFullName] = useState("");
  const [cGender, setGender] = useState("Select Gender");
  const [cEmailAddress, setEmailAddress] = useState("");
  const [cPosition, setPosition] = useState("Select Position");
  const [cPhoneNumber, setPhoneNumber] = useState("");
  //--------------------------------------------------------------------------------------------------

  //States for Updating The Existing membe--------------------------------
  const [editID, setEditID] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  //-------------------------------------------------------------------------------------------------------------------

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://localhost:44365/api/v1/Actors", {
        headers: {
          Authorization: `Bearer ${loggedIn}`,
        },
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error(`Unauthorized, please log in`);
        }
        toast.error(`An error occurred, try again later`);
        console.log(err.response.data);
      });
  };

  //Function for the Posting Data to create a new Member.------------------------------------
  const handleCreate = () => {
    if (cFullName == "") {
      toast.error("Full Name is required");
    } else if (cGender == "Select Gender") {
      toast.error("Please select a gender");
    } else if (cEmailAddress == "") {
      toast.error("Email is required");
    } else if (!Email_REGEX.test(cEmailAddress)) {
      toast.error("Wrong email format");
    } else if (cPosition == "Select Position") {
      toast.error("Please select a Postion");
    } else if (cPhoneNumber == "") {
      toast.error("phone is required");
    } else {
      const postUrl = "https://localhost:44365/api/v1/Actors";
      const postData = {
        fullName: cFullName,
        gender: cGender,
        email: cEmailAddress,
        position: cPosition,
        phone: cPhoneNumber,
      };

      axios
        .post(postUrl, postData, {
          headers: {
            Authorization: `Bearer ${loggedIn}`,
          },
        })
        .then((result) => {
          fetchData();
          toast.success("The Actor has been created successfully");
          clearControllers();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error(`You're logged out, please log in`);
            // console.log(err.response.status);
          }
          if (error.response.data[""]) {
            toast.error(error.response.data[""][0]);
          } else if (error.response.data["Email"]) {
            toast.error(error.response.data["Email"][0]);
          } else if (error.response.data["Phone"]) {
            toast.error(error.response.data["Phone"][0]);
          } else {
            toast.error("Error Occured, Please try again later");
            console.log(error.response.data);
          }
        });
    }
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:44365/api/v1/Actors/${id}`, {
        headers: {
          Authorization: `Bearer ${loggedIn}`,
        },
      })
      .then((result) => {
        setEditFullName(result.data.fullName);
        setEditGender(result.data.gender);
        setEditEmailAddress(result.data.email);
        setEditPosition(result.data.position);
        setEditPhoneNumber(result.data.phone);
        setEditID(id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error(`You're logged out, please log in`);
          // console.log(err.response.status);
        } else if (error.response.status === 404) {
          toast.error(`The actor not exists on the system`);
        } else {
          console.log(error.response);
          toast.error(`Error occurred, try again later`);
        }
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this actor?") == true) {
      axios
        .delete(`https://localhost:44365/api/v1/Members/${id}`, {
          headers: {
            Authorization: `Bearer ${loggedIn}`,
          },
        })
        .then((result) => {
          if (result.status === 200) {
            toast.success("The actor has been deleted successfully");
            fetchData();
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error(`You're logged out, please log in`);
            // console.log(err.response.status);
          } else if (error.response.status === 404) {
            toast.error(`The actor not exists on the system`);
          } else {
            console.log(error.response);
            toast.error(`Error occurred, try again later`);
          }
        });
    }
  };

  const handleUpdate = () => {
    if (editFullName == "") {
      toast.error("Full Name is required");
    } else if (editGender == "Select Gender") {
      toast.error("Please select a gender");
    } else if (editEmailAddress == "") {
      toast.error("Email is required");
    } else if (!Email_REGEX.test(editEmailAddress)) {
      toast.error("Wrong email format");
    } else if (editPosition == "Select Position") {
      toast.error("Please select a Postion");
    } else if (editPhoneNumber == "") {
      toast.error("phone is required");
    } else {
      const putUrl = `https://localhost:44365/api/v1/Actors/${editID}`;
      const putData = {
        fullName: editFullName,
        gender: editGender,
        email: editEmailAddress,
        position: editPosition,
        phone: editPhoneNumber,
      };

      axios
        .put(putUrl, putData, {
          headers: {
            Authorization: `Bearer ${loggedIn}`,
          },
        })
        .then((result) => {
          fetchData();
          toast.success("The actor has been updated successfully");
          clearControllers();
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status === 401) {
            toast.error(`You're logged out, please log in`);
            // console.log(err.response.status);
          } else if (error.response.data[""]) {
            toast.error(error.response.data[""][0]);
          } else {
            toast.error("Error Occured, Please try again later");
            console.log(error.response.data);
          }
        });
    }
  };

  //Function to clear all the form elements after submission----------------------------------------
  const clearControllers = () => {
    setFullName("");
    setGender(-1);
    setEmailAddress("");
    setPosition(-1);
    setPhoneNumber("");

    setEditFullName("");
    setEditGender("Select Gender");
    setEditEmailAddress("");
    setEditPosition("Select Position");
    setEditPhoneNumber("");
    setEditGender("");
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------

  const handleLogout = () => {
    setLoggedIn("");
  };
  return (
    <Fragment>
      <div className="container">
        <h2>Create Actor</h2>
      </div>
      <ToastContainer />

      <div className="mt-4 cOntainerBG container container-fluid radiusMode myFontFamilly">
        <Container>
          <Row>
            <Col>
              <input
                type="input"
                required
                className="form-control mb-2"
                placeholder="Full Name"
                value={cFullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={cGender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value={"Select Gender"}>Select Gender</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Other"}>Other</option>
              </select>
            </Col>
            <Col>
              <input
                type="email"
                required
                className="form-control"
                placeholder="Email Address"
                value={cEmailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <select
                className="form-control"
                value={cPosition}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value={"Select Position"}>Select Position</option>
                <option value={"Producer"}>Producer</option>
                <option value={"Director"}>Director</option>
                <option value={"ProducerAssistant"}>Producer Assistant</option>
                <option value={"DirectorAssistant"}>Director Assistant</option>
                <option value={"Cameraman"}>Cameraman</option>
                <option value={"CameraAssistant"}>Camera Assistant</option>
                <option value={"Presenter"}>Presenter</option>
                <option value={"Other"}>Other</option>
              </select>
            </Col>
            <Col>
              <input
                value={cPhoneNumber}
                type="phone"
                required
                className="form-control"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Col>

            <Col>
              <button
                type="button"
                className="form-control btn btn-success"
                onClick={() => handleCreate()}
              >
                Create
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <br></br>
      <div className="container">
        <h2>List Actors</h2>
      </div>

      <div className="mt-4 cOntainerBG myFontFamilly container radiusMode">
        <Container className="mt-3">
          <Table striped bordered hover className="raduis table-fluid">
            <thead>
              <tr>
                <th>#</th>
                <th>FullName</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Position</th>
                <th>Phone</th>
                <th>Operations</th>
              </tr>
            </thead>

            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => {
                    // if(item.gender==0){

                    // }
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.fullName}</td>
                        <td>{item.gender}</td>
                        <td>{item.email}</td>
                        <td>{item.position}</td>
                        <td>{item.phone}</td>

                        <td colSpan={2}>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Container>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="cOntainerBG modalHeader">
          <Modal.Title>Modify Actor</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalInput modalBody">
          <Container>
            <Row>
              <Col>
                <input
                  type="input"
                  required
                  className="form-control"
                  placeholder="Full Name"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
                >
                  <option value={"Select Gender"}>Select Gender</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Other"}>Other</option>
                </select>
              </Col>
              <Col>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="Email Address"
                  value={editEmailAddress}
                  onChange={(e) => setEditEmailAddress(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <select
                  className="form-control"
                  value={editPosition}
                  onChange={(e) => setEditPosition(e.target.value)}
                >
                  <option value={"Select Position"}>Select Position</option>
                  <option value={"Producer"}>Producer</option>
                  <option value={"Director"}>Director</option>
                  <option value={"ProducerAssistant"}>
                    Producer Assistant
                  </option>
                  <option value={"DirectorAssistant"}>
                    Director Assistant
                  </option>
                  <option value={"Cameraman"}>Cameraman</option>
                  <option value={"CameraAssistant"}>Camera Assistant</option>
                  <option value={"Presenter"}>Presenter</option>
                  <option value={"Other"}>Other</option>
                </select>
              </Col>

              <Col>
                <input
                  type="phone"
                  required
                  className="form-control"
                  placeholder="Phone Number"
                  value={editPhoneNumber}
                  onChange={(e) => setEditPhoneNumber(e.target.value)}
                />
              </Col>

              <Col>
                <input type="text" disabled className="form-control" />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="cOntainerBG">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <div className="container cOntainerBG mt-5 nav">
          <h1 className="m-4 .radiusMode">Film Industry</h1>

          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default CRUD;
