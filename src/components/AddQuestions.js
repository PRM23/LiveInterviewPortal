import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "./image/logo.svg";
import axios from "axios";
import Button from "@mui/material/Button";
import { Autocomplete, Stack, TextField } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { flexbox, height } from "@mui/system";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

function AddQuestions() {
  const data = JSON.parse(localStorage.getItem("_activeUser")) || [];
  const sub = JSON.parse(localStorage.getItem("subject")) || [];
  // console.log(data.token);
  let token = data.token;
  let ques_type = [
    "MULTIPLE CHOICE",
    "MULTIPLE REASPONSE",
    "FILL IN THE BLANKS",
  ];

  let difficulty_level = ["Easy", "Medium", "Hard"];

  // const [question, setQuestion] = useState({
  //   subject: "",
  //   topic: "",
  //   type: "",
  //   diffLevel: "",
  //   rightMarks: 0,
  //   wrongMarks: 0,
  //   questionText: "",
  // });
  const [value, setValue] = React.useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState([]);
  const [questionText, setquestionText] = useState("");
  const [topics, setTopics] = useState("");
  const [select, setIsSelect] = useState(false);
  const [cnt, setCnt] = useState(5);
  const [option, setOption] = useState([]);
  const [opts, setOpts] = useState("");

  const tempArr = [
    {
      diffLevel: "Medium",
      options: null,
      questionText: "",
      rightMarks: 1,
      subject: "",
      topic: "",
      type: opts,
      wrongMarks: 0,
    },
  ];

  const [tempArrData, setTempArrData] = useState(tempArr);

  const tempOptionArr = [
    {
      richTextEditor: false,
      isCorrect: false,
      option: "",
    },
    {
      richTextEditor: false,
      isCorrect: false,
      option: "",
    },
    {
      richTextEditor: false,
      isCorrect: false,
      option: "",
    },
    {
      richTextEditor: false,
      isCorrect: false,
      option: "",
    },
  ];
  const [opt, setOpt] = useState(tempOptionArr);
  console.log(
    opt.map((i) => {
      return i.option;
    })
  );
  const [inputValue, setInputValue] = React.useState("");
  const [post, setPost] = useState([]);
  let url = `http://admin.liveexamcenter.in/api/questions`;

  let SubjectUrl = "http://admin.liveexamcenter.in/api/subjects?term=";

  let TopicUrl = `http://admin.liveexamcenter.in/api/topics/subject/${topics}`;

  useEffect(() => {
    setTempArrData({ ...tempArrData, options: opt });
  }, [opt]);

  useEffect(() => {
    axios
      .get(SubjectUrl, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        let temp = [];
        res.data.result.map((each, i) => {
          // console.log(each._id);
          return (temp[i] = each.name);
        });
        setSubject(temp);

        let data1 = res.data.result.filter((each, i) => each.name === value);

        //setSubject(sub)
        //setValue(sub)
        console.log(data1[0]?.name);
        setTopics(data1[0]?._id);
        console.log(topics);
      });
  }, [token, value]);

  useEffect(() => {
    axios
      .get(TopicUrl, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        let temp = [];
        res.data.map((a, i) => {
          console.log(a.name);
          temp[i] = a.name;
        });
        console.log(temp);
        setTopic(temp);
        let val = temp;
        // localStorage.setItem("topic",JSON.stringify(val))
      });
  }, [token, topics, value]);
  console.log(value);

  const ChangeHandler = () => {
    setIsSelect(true);
  };

  const OptionHandler = () => {
    setOpt((prev) => [...prev, cnt]);
    setCnt(cnt + 1);
  };

  console.log(inputValue);

  console.log(opts);

  const OptAddHandler = (id, input) => {
    console.log({ id: input });

    console.log(opt);
    setOpt((prev) =>
      prev.map((option, i) => (i == id ? { ...option, option: input } : option))
    );
  };
  console.log(opt);

  const SaveHandler = () => {
    const payload = JSON.stringify({
      rightMarks: 1,
      questionText: questionText,
      options: opt,
      wrongMarks: 0,

      // { option: "hello", isCorrect: false, richTextEditor: false },
      // { option: "bye", isCorrect: false, richTextEditor: false },
      // { option: "goodbye", isCorrect: true, richTextEditor: false },
    });
    axios
      .post(url, payload, {
        headers: { Authorization: token, "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTempArrData(tempArr);

    console.log("added!");
  };
  // const handleChange = (e) => {
  //   setQuestion({ ...question, [e.target.name]: e.target.value });
  // };

  //console.log(question);

  const CheckBoxHandler = (id, e) => {
    console.log("clicked");

    // : setOpt((prev) =>
    //     prev.map((isCorrect, i) =>
    //       i == id ? { ...isCorrect, isCorrect: false } : isCorrect
    //     )
    //   );
  };
  const RadioHandler = (id, e) => {
    console.log("clicked", e);

    e.checked !== false
      ? setOpt((prev) =>
          prev.map((isCorrect, i) =>
            i == id
              ? { ...isCorrect, isCorrect: true }
              : { ...isCorrect, isCorrect: false }
          )
        )
      : setOpt((prev) =>
          prev.map((isCorrect, i) =>
            i == id ? { ...isCorrect, isCorrect: false } : isCorrect
          )
        );
  };

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

      <div className="p-3 form-control">
        <div className="d-flex justify-content-between align-items-center ">
          <h4 className="display-medium m-2 fs-18">Add Questions</h4>
        </div>
        <div className="row align-items-start">
          <div className="col">
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              name="subject"
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              sx={{ m: 2, width: 550 }}
              options={subject}
              renderInput={(params) => (
                <TextField {...params} label="Subject Name" />
              )}
            />
          </div>
          <div className="col">
            <Autocomplete
              id="controllable-states-demo"
              sx={{ m: 2, width: 550 }}
              options={topic}
              renderInput={(params) => (
                <TextField {...params} label="Topic Name" />
              )}
            />
          </div>
        </div>
        <div className="row align-items-start">
          <div className="col">
            <Autocomplete
              id="controllable-states-demo"
              sx={{ m: 2, width: 230 }}
              options={ques_type}
              inputValue={opts}
              onInputChange={(event, newInputValue) => {
                setOpts(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Question Type" />
              )}
            />
          </div>
          <div className="col">
            <Autocomplete
              id="controllable-states-demo"
              sx={{ m: 2, width: 230 }}
              options={difficulty_level}
              renderInput={(params) => (
                <TextField {...params} label="Difficulty Level" />
              )}
            />
          </div>
          <div className="col">
            <TextField
              sx={{ m: 2, width: 270 }}
              id="outlined-basic"
              label="Right Marks"
              variant="outlined"
            />
          </div>
          <TextField
            sx={{ m: 2, width: 270 }}
            id="outlined-basic"
            label="Wrong Marks"
            variant="outlined"
          />
        </div>
        <div className="p-2 row align-items-start">
          <TextareaAutosize
            sx={{ m: 12, width: 130 }}
            onChange={(e) => setquestionText(e.target.value)}
            aria-label="minimum height"
            minRows={5}
            variant="outlined"
            label="Question"
            placeholder="Question"
          ></TextareaAutosize>

          <div className="row align-items-start">
            <div class="flex" style={{ paddingRight: "75%" }}>
              <a
                _ngcontent-vur-c5=""
                class="text-muted ng-star-inserted"
                href="javascript:;"
                tabindex="-1"
                onClick={ChangeHandler}
              >
                Enable Rich text editor
              </a>
            </div>
          </div>
        </div>

        {opt.map((obj, index) => {
          return (
            <>
              {console.log(obj.isCorrect)}

              <div className="p-2 row align-items-start">
                <div className="container" style={{ display: "inline-flex" }}>
                  {opts === "MULTIPLE REASPONSE" ? (
                    <div style={{ border: "1px solid gray", width: "auto" }}>
                      <label
                        style={{ display: "contents", paddingRight: "95%" }}
                      >
                        <input
                          onChange={
                            (e) => CheckBoxHandler(index, e)
                            //  RadioHandler(index, e.target.value)
                          }
                          type="checkbox"
                        />
                        Option{index}
                      </label>
                    </div>
                  ) : (
                    <div style={{ border: "1px solid gray", width: "auto" }}>
                      <label
                        style={{ display: "contents", paddingRight: "95%" }}
                      >
                        <input
                          onChange={(e) => RadioHandler(index, e.target.value)}
                          type="radio"
                        />
                        Option{index}
                      </label>
                    </div>
                  )}
                  <TextareaAutosize
                    style={{ width: "85%" }}
                    aria-label="minimum height"
                    minRows={4}
                    onChange={(e) => OptAddHandler(index, e.target.value)}
                    variant="outlined"
                  ></TextareaAutosize>
                </div>
                <div className="row align-items-start">
                  <div class="flex" style={{ paddingRight: "75%" }}>
                    <a
                      _ngcontent-teo-c5=""
                      class="text-muted"
                      href="javascript:;"
                      tabindex="-1"
                      // onClick={RemoveHandler(index)}
                    >
                      Remove option
                    </a>
                    <span _ngcontent-teo-c5="" class="text-muted">
                      |
                    </span>
                    <a
                      _ngcontent-vur-c5=""
                      class="text-muted ng-star-inserted"
                      href="javascript:;"
                      tabindex="-1"
                      onClick={ChangeHandler}
                    >
                      Enable Rich text editor
                    </a>
                  </div>
                </div>
              </div>
            </>
          );
        })}

        <Button
          style={{ paddingRight: "90%" }}
          variant="text"
          onClick={OptionHandler}
        >
          + Add Option
        </Button>
        <div style={{ paddingRight: "80%" }}>
          <Button
            style={{ margin: 2 }}
            variant="contained"
            onClick={SaveHandler}
          >
            Save Questions
          </Button>
          <Button variant="outlined">Cancel</Button>
        </div>
      </div>
    </>
  );
}

export default AddQuestions;
