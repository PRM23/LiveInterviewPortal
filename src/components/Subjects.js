import React, { useState, useEffect } from "react";
import image from "./image/logo.svg";
import { Link } from "react-router-dom";
import "./Portal.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "react-bootstrap";
import axios from "axios";

function Subjects() {
  const data = JSON.parse(localStorage.getItem("_activeUser"));
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [post, setPost] = useState({});
  const [limit, setLimit] = useState("");
  const [page, setPage] = useState(1);
  const [term, setTerm] = useState("");
  let deleteJSON;
  //const [token, setToken] = useState(data);
  let token = data.token;
  console.log(token);

  let url = `http://admin.liveexamcenter.in/api/subjects?page=1&limit=${limit}&term=${term}&topic=`;
  let SubjectUrl = `http://admin.liveexamcenter.in/api/subjects/`;

  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(url, { headers: { Authorization: token } }).then((res) => {
      console.log(res.data);
      setPost(res.data);
    });
  }, [term, token, limit]);

  // useEffect(() => {
  //   axios.get(
  //     SubjectUrl,
  //     { headers: { Authorization: token } }.then((res) => {
  //       console.log(res.data);
  //     })
  //   );
  // }, [Subjects]);

  const SubjectHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    setShow(true);
  };

  const SaveHandler = (e) => {
    e.preventDefault();

    const payload = JSON.stringify({
      name: name,
    });
    axios
      .post(url, payload, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(value);

  const RemoveHandler = (id) => {
    // const Subject = {
    //   method: "DELETE",
    //   headers: { Authorization: token },
    //   //   body: JSON.stringify({ data }),
    // };

    // fetch(`http://admin.liveexamcenter.in/api/subjects/${id}`, Subject).then(
    //   (res) => {
    //     res.json().then((result) => console.log(result));
    //   }
    // );

    fetch(`http://admin.liveexamcenter.in/api/subjects/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    }).then((res) => {
      res.json().then((result) => {
        console.warn(result);
      });
    });
    // console.log(post.result);
    // console.log(id);
    // let remove = post.result.filter((a, i) => a._id != id);
    // console.log(remove);
  };
  const CloseHandler = () => {
    setShow(false);
  };
  console.log(name);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <img style={{ height: "70px" }} src={image} />

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse p-4" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/questions">
                  Questions
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav class="navbar navbar-expand-lg navbar-dark navbar-a">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link class="nav-link " aria-current="page" to="/questions">
                Questions
              </Link>
              <Link class="nav-link" to="/Subjects">
                Subjects
              </Link>
              <Link class="nav-link" to="/topics">
                Topics
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="d-flex justify-content-between align-items-center m-3">
        <h4 className="display-medium m-0 fs-18">Subjects</h4>
        <div>
          <button
            type="button"
            class="btn text-capitalize btn-primary btn float-end "
            onClick={SubjectHandler}
          >
            + Add Subjects
          </button>

          <Modal show={show}>
            <ModalHeader>Subject Name</ModalHeader>
            <ModalBody>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="form-control"
                id="newnote"
                name="newnote"
                placeholder="Subject Name"
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={CloseHandler} show={show}>
                Close
              </Button>
              <Button show={show} onClick={SaveHandler}>
                Save
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-body table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <div className="container d-flex" style={{ width: "100%" }}>
                      <div className="delete-multiple m-2">
                        <input type="checkbox" />
                        <span display-medium m-2>
                          Show
                        </span>
                        <select
                          className="mx-2 ng-untouched ng-pristine ng-valid"
                          formcontrolname="limitPerPage"
                          value={limit}
                          onChange={(e) => setLimit(e.target.value)}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                          <option value={50}>50</option>
                        </select>
                        <span>records per page</span>
                      </div>
                    </div>
                  </th>
                  <th>
                    <form>
                      <input
                        class="form-control"
                        style={{ width: "50%" }}
                        placeholder="Search"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                      ></input>
                    </form>
                  </th>
                </tr>

                <tr>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {post.result?.map((a, i) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-top">
                          <input className="mt-1 mr-2" type="checkbox" />
                          <div className="container">
                            <th scope="row">{i + 1}</th>
                            <div>{a.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <i
                          className="fa fa-trash m-4"
                          id="hover"
                          aria-hidden="true"
                          onClick={() => RemoveHandler(a._id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Subjects;
