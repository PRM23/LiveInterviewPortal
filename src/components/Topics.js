import React, { useState, useEffect } from "react";
import image from "./image/logo.svg";
import { Link } from "react-router-dom";
import "./Portal.css";
import axios, { Axios } from "axios";
import { Autocomplete, Stack, TextField } from "@mui/material";

import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "react-bootstrap";

function Topics() {
  const data = JSON.parse(localStorage.getItem("_activeUser"));
  const token = data.token;
  const [post, setPost] = useState({});
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const [subjects, setSubjects] = useState([]);
  const [limit, setLimit] = useState("");
  const [page, setPage] = useState(1);
  const [term, setTerm] = useState("");
  const [delVal, setDelVal] = useState(false);

  const [show, setShow] = useState(false);
  console.log(token);

  // const url = `http://admin.liveexamcenter.in/api/topics?page=1&limit=${limit}&term=${term}`;
  const url = "http://admin.liveexamcenter.in/api/topics?page=1&limit=5&term=";
  const TopicUrl = "http://admin.liveexamcenter.in/api/topics";

  const SubjectUrl = "http://admin.liveexamcenter.in/api/subjects?term=";

  useEffect(() => {
    axios.get(url, { headers: { Authorization: token } }).then((res) => {
      console.log(res.data);
      setPost(res.data);
    });
  }, [token, term, limit]);
  console.log(post.result);

  // let temp1 = post.result?.map((a, i) => console.log(a.subject._id));

  // useEffect(() => {
  //   axios.get(SubjectUrl, { headers: { Authorization: token } }).then((res) => {
  //     console.log(res.data);
  //     setSubjects(res.data);
  //     let temp = [];
  //     res.data.result.map((a, i) => {
  //       return (temp[i] = a.name);
  //     });
  //     console.log(temp);

  //     setSubjects(temp);
  //   });
  // }, []);

  console.log(subjects);

  const AddTopics = (e) => {
    e.preventDefault();
    console.log("clicked");
    axios.get(SubjectUrl, { headers: { Authorization: token } }).then((res) => {
      console.log(res.data);
      setSubjects(res.data);
      let temp = [];
      res.data.result.map((a, i) => {
        return (temp[i] = a.name);
      });
      console.log(temp);

      setSubjects(temp);
    });
    setShow(true);
  };

  const RemoveHandler = (id) => {
    fetch(`http://admin.liveexamcenter.in/api/topics/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    }).then((res) => {
      res.json().then((result) => {
        setDelVal(true);
        console.warn(result);
      });
    });
  };
  let val = "";
  const SaveHandler = (e) => {
    e.preventDefault();
    let payload = {
      name: name,
      // subject: val,
    };
    axios
      .post(TopicUrl, payload, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);

        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(url, { headers: { Authorization: token } }).then((res) => {
      console.log(res.data);
      //setPost(res.data);
      // let temp = [];
      // temp = post.result.filter((a, i) => console.log(a.subject._id));
    });

    // axios.get(SubjectUrl, { headers: { Authorization: token } }).then((res) => {
    //   console.log(res.data);
    //   setSubjects(res.data);
    //   let temp = [];
    //   res.data.result.filter((a, i) => {
    //     console.log(a);
    //     return (temp[i] = a._id);
    //   });
    //   // res.data.result.filter((a, i) => console.log(a._id));
    //   // //console.log(val);

    //   setSubjects(temp);
    // });
  };

  const CloseHandler = () => {
    setShow(false);
  };
  console.log(value);
  console.log(subject);
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
        <h4 className="display-medium m-0 fs-18">Topics</h4>
        <div>
          <button
            type="button"
            class="btn text-capitalize btn-primary btn float-end "
            onClick={AddTopics}
          >
            + Add Topics
          </button>
          <Modal show={show}>
            <ModalHeader>Topic Name</ModalHeader>
            <ModalBody>
              <Autocomplete
                value={subject}
                onChange={(event, newValue) => {
                  setSubject(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                sx={{ m: 2, width: 450 }}
                options={subjects}
                renderInput={(params) => (
                  <TextField {...params} label="Subject Name" />
                )}
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="form-control m-2"
                id="newnote"
                name="newnote"
                placeholder="Topic Name"
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={CloseHandler}>Close</Button>
              <Button onClick={SaveHandler}>Save</Button>
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
                  <th>Sr.No</th>
                  <th>Subject</th>
                  <th>Topic</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {post.result?.map((a, i) => {
                  // let val = a.subject._id;
                  // console.log(val);
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-top">
                          <input className="mt-1 mr-2 m-3" type="checkbox" />

                          <th scope="row">{i + 1}</th>
                        </div>
                      </td>

                      <td>
                        <div>{a.subject?.name}</div>
                      </td>
                      <td>
                        <div>{a.name}</div>
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

export default Topics;
