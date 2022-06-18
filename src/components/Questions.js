import React, { useState, useEffect } from "react";
import image from "./image/logo.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import "./Portal.css";

function Questions() {
  const data = JSON.parse(localStorage.getItem("_activeUser")) || [];

  const token = data.token;
  const navigation = useNavigate();
  const [topics, setTopics] = useState([]);
  const [value, setValue] = React.useState(data);

  const [inputValue, setInputValue] = React.useState("");
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const [term, setTerm] = useState("");
  const [topic, setTopic] = useState("");
  const [limit, setLimit] = useState("");
  const [page, setPage] = useState(1);

  const [post, setPost] = useState({});
  const [cnt, setCnt] = useState();

  let url = `http://admin.liveexamcenter.in/api/questions?page=${page}&limit=${limit}&term=${term}&topic=`;

  let TopicUrl = `http://admin.liveexamcenter.in/api/topics?page=1&limit=${limit}&term=${term}`;

  useEffect(() => {
    axios.get(url, { headers: { Authorization: token } }).then((res) => {
      console.log(res.data);

      setPost(res.data);
    });
  }, [token, limit, term]);

  useEffect(() => {
    axios.get(TopicUrl, { headers: { Authorization: token } }).then((res) => {
      console.log(res.data);
      let temp = [];
      temp = res.data.result.map((obj, index) => {
        return (temp[index] = obj.name);
      });

      setTopics(temp);
    });
  }, [limit, term]);

  const ChangeHandler = (id) => {
    const data1 = post.result?.filter((each) => each.topic === id);
    console.log(data1);
    setTopic(data1);
  };

  console.log(post.result);

  const SelectHandler = (e) => {};

  const RemoveHandler = (id) => {
    // fetch(`http://admin.liveexamcenter.in/api/questions/${id}`, {
    //   method: "DELETE",
    //   headers: { Authorization: token },
    // }).then((res) => {
    //   res.json().then((result) => {
    //     console.warn(result);
    //   });
    // });
  };
  const Addques = () => {
    navigation("/addques");
  };

  const EditHandler = (id) => {
    //  console.log(id);
    console.log(post);
    // navigation(`/Edit}`);
  };
  // console.log(topics);
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

      <div className="d-flex justify-content-between align-items-center ">
        <h4 className="display-medium m-2 fs-18">Questions</h4>
        <div>
          <button
            type="button"
            class="btn text-capitalize btn-primary btn float-end "
            onClick={Addques}
          >
            + Add Questions
          </button>
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
                    <form class="d-flex align-items-right">
                      <input
                        class="form-control"
                        style={{ width: "50%" }}
                        placeholder="Search"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                      ></input>

                      {/* <select
                        className="mx-2 ng-untouched ng-pristine ng-valid"
                        style={{ width: "150px" }}
                        formcontrolname="limitPerPage"
                        onChange={SelectHandler}
                      >
                        {topics.result?.map((a, i) => {
                          console.log(a._id);
                          return (
                            <option
                              value={topics}
                              onChange={(e,val)=>setTopic(val._id)}
                            >
                              {a.name}
                            </option>
                          );
                        })}
                      </select> */}

                      {topics != null && (
                        <Autocomplete
                          id="controllable-states-demo"
                          options={topics}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Topic" />
                          )}
                        />
                      )}
                    </form>
                  </th>
                </tr>
              </thead>
              <tbody>
                {post.result?.map((a, i) => {
                  console.log(a._id);
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-top">
                          <input className="mt-1 mr-2" type="checkbox" />
                          <div>
                            <div className="container">
                              <div>{a.questionText}</div>

                              {a.options.map((opt) => {
                                return (
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      disabled
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDisabled"
                                    >
                                      {opt.option}
                                    </label>
                                  </div>
                                );
                              })}

                              <i
                                className="fa fa-trash "
                                id="hover"
                                aria-hidden="true"
                                onClick={()=>RemoveHandler(a._id)}
                              ></i>
                              <i
                                className="fa fa-edit m-3"
                                id="hover"
                                aria-hidden="true"
                                onClick={() => navigation(`/Edit/${a._id}`)}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
