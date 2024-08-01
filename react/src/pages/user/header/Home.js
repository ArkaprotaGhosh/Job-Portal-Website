import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/assets.js";
import { Link } from "react-router-dom";
import { CgEnter, CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { LuUpload } from "react-icons/lu";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Perform your search API call here
        // const encodedSearchTerm = encodeURIComponent(searchTerm);
        const response = await fetch(
          `http://localhost:5008/api/addjob/getJobbyjobRole/?jobRole=${searchTerm}`
        );

        console.log("response==================>", response);
        console.log("searchitem---------------->", searchTerm);
        const data = await response.json();
        console.log("data1---------------", data);
        console.log("data2---------------", data.data);
        if (data.success === true) {
          setSearchResults(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const searchResultsLenght = searchResults?.length;

  const jobCategories = [
    { title: "Graphic Designer", openings: 167 },
    { title: "Content Writer", openings: 97 },
    { title: "Video Editor", openings: 130 },
    { title: "UI Designer", openings: 70 },
    { title: "Health & Care", openings: 55 },
    { title: "Code & Programming", openings: 67 },
    { title: "Accounts & Finance", openings: 167 },
    { title: "Data Science", openings: 167 },
  ];

  return (
    <>
      <section
      // style={{ paddingTop: "100px", backgroundImage: `url(${assets.image})`,backgroundSize: 'cover',     }}
      >
        <div>
          <div>
            <img
              className="addSection1 "
              src={assets.img1}
              alt="Description of the image"
            />
          </div>
          {/* <div className='backgroung'></div> */}

          <div>
            <h1
              className="hometext1"
              style={{
                color: "white",
                marginTop: "-425px",
                fontSize: "3.15rem",
              }}
            >
              Find Your Dream Job Today!{" "}
            </h1>
            <p
              className="hometext2"
              style={{ color: "white", marginTop: "2rem" }}
            >
              Explore thousand of job listing from top companies !{" "}
            </p>
          </div>
          <div
            className="homeform"
            style={{
              marginBottom: "100px",
              backgroundColor: "#f0f8ff00",
              borderColor: "white",
              backdropFilter: "blur",
              boxShadow: "0px, 0px 0px 0px white",
              marginTop: "15px",
              border: "2px solid rgb(255 255 255)",
              display: "inline-block",
            }}
          >
            <form>
              {/* {message && <div className="message">{message}</div>} */}
              <div style={{ display: "inline-flex" }}>
                <IoIosSearch />
              </div>

              <input
                type="text"
                id="Search"
                name="Search"
                placeholder="Enter Job Titel"
                value={searchTerm}
                onChange={handleSearchInputChange}
                style={{
                  padding: "14px",
                  width: "20%",
                  backgroundColor: "#f0f8ff00",
                  color: "white",
                  borderRadius: "0px",
                  border: "0px solid #ccc",
                  marginBottom: "0px",
                  width: "40%",
                }}
              />
              <input
                type="text"
                id="Search"
                name="Search"
                placeholder="Enter Location"
                value={searchTerm}
                onChange={handleSearchInputChange}
                style={{
                  padding: "0px 10px 0px 20px",
                  width: "20%",
                  marginBottom: "100px",
                  backgroundColor: "#f0f8ff00",
                  color: "white",
                  borderRadius: "0px",
                  border: "0px solid #ccc",
                  width: "40%",
                  borderLeft: "1px solid white",
                  borderRight: "0px",
                }}
              />
              <button
                className="homesearchbtn"
                style={{ border: "0px", fontSize: "18px" }}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          {loading && <p>Loading...</p>}
          {/* {searchResultsLenght > 0 && (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        )}
        {searchResultsLenght === 0 && !loading && searchTerm.trim() !== '' && (
          <p>No results found.</p>
        )} */}

          <div
            className="popularSearch"
            style={{
              backgroundColor: "white",
              borderColor: "white",
              backdropFilter: "blur",
              boxShadow: "0px 0px 5px 1px rgb(100 100 100)",
              margin: "-13px 0px 69px 10px",
              display: "inline-block",
            }}
          >
            <div
              className="popularSearch1"
              style={{
                backgroundColor: "#16558F",
                borderColor: "white",
                backdropFilter: "blur",
                margin: "0px 0px 0px 0px",
                display: "inline-block",
              }}
            >
              <h1>
                Popular <br /> Searches
              </h1>

              <p style={{ fontSize: "x-small" }}>
                the advice helped me feel prepared and confident. gies for acing
                interviews, the advice helped me feel prepared and confident.
              </p>

              <Link to="/jobs">
                <button
                  className="popularSearchbtn"
                  style={{
                    borderRadius: "5px",
                    fontSize: "small",
                    boxShadow: "rgb(0 0 0) 0px 2px 5px 0px",
                    height: "36px",
                    border: "0px",
                  }}
                >
                  Browse Jobs
                </button>
              </Link>
            </div>

            <div
              className="popularSearch2"
              style={{
                borderColor: "white",
                backdropFilter: "blur",
                boxShadow: "rgb(29 29 29) 0px 0px 2px 0px",
                margin: "-252px 0px 0px 338px",
                borderRadius: "0px 0px 0px 0px",
              }}
            >
              <p style={{ marginBottom: "0rem", marginTop: "14px" }}>
                UI/UX Designer
              </p>
              <p style={{ fontSize: "medium", marginBottom: "0rem" }}>
                2500+ Jobs
              </p>
            </div>
            <div
              className="popularSearch2"
              style={{
                borderColor: "white",
                backdropFilter: "blur",
                boxShadow: "rgb(29 29 29) 0px 0px 2px 0px",
                margin: "7px 0px 0px 338px",
                borderRadius: "0px 0px 0px 0px",
              }}
            >
              <p style={{ marginBottom: "0rem", marginTop: "10px" }}>
                UI/UX Designer
              </p>
              <p style={{ fontSize: "medium", marginBottom: "0rem" }}>
                2500+ Jobs
              </p>
            </div>
            <div
              className="popularSearch2"
              style={{
                borderColor: "white",
                backdropFilter: "blur",
                boxShadow: "rgb(29 29 29) 0px 0px 2px 0px",
                margin: "-251px 0px 0px 571px",
                borderRadius: "0px 10px 0px 0px",
              }}
            >
              <p style={{ marginBottom: "0rem", marginTop: "14px" }}>
                UI/UX Designer
              </p>
              <p style={{ fontSize: "medium", marginBottom: "0rem" }}>
                2500+ Jobs
              </p>
            </div>
            <div
              className="popularSearch2"
              style={{
                borderColor: "white",
                backdropFilter: "blur",
                boxShadow: "rgb(29 29 29) 0px 0px 2px 0px",
                margin: "7px 0px 0px 571px",
                borderRadius: "0px 0px 10px 0px",
              }}
            >
              <p style={{ marginBottom: "0rem", marginTop: "10px" }}>
                UI/UX Designer
              </p>
              <p style={{ fontSize: "medium", marginBottom: "0rem" }}>
                2500+ Jobs
              </p>
            </div>
          </div>
          <div>
            <h1 style={{ fontWeight: "bold" }}>
              How{" "}
              <h1
                style={{
                  display: "inline-block",
                  color: "#2171D5",
                  fontWeight: "bold",
                }}
              >
                It Works
              </h1>
            </h1>
            <button
              className="howitworks"
              style={{ margin: "50px 0px 50px 0px", display: "inline-block" }}
            >
              Create Your Profile
            </button>
            <p
              className="howitworks"
              style={{ margin: "50px 0px 50px 0px", display: "contents" }}
            >
              {" "}
              ---------&gt;{" "}
            </p>
            <button
              className="howitworks"
              style={{ margin: "50px 0px 50px 0px", display: "inline-block" }}
            >
              Search For Jobs
            </button>
            <p
              className="howitworks"
              style={{ margin: "50px 0px 50px 0px", display: "contents" }}
            >
              {" "}
              ---------&gt;{" "}
            </p>
            <button
              className="howitworks"
              style={{ margin: "50px 0px 50px 0px", display: "inline-block" }}
            >
              Apply For Jobs
            </button>
            <p
              className="howitworks"
              style={{ margin: "50px 0px 50px 0px", display: "contents" }}
            >
              {" "}
              ---------&gt;{" "}
            </p>
            <button
              className="howitworks"
              style={{ margin: "50px 0px 50px 0px", display: "inline-block" }}
            >
              Get Hired
            </button>
          </div>
          <div>
            <div className="homemobile">
              <div className="homemobileinner">
                <div className="profileicon">
                  {/* <div> */}
                  <CgProfile />
                  {/* </div> */}
                </div>

                <button className="profilebutton">
                  <div style={{ display: "inline" }}>
                    <LuUpload /> Upload
                  </div>
                </button>
                <h6 style={{ textAlign: "left" }}>Personal information</h6>
                <div className="mobileinnerrmost">
                  <button className="profileSmalldisplay"></button>
                  <button className="profilelargedisplay"></button>
                  <button className="profileSmalldisplay"></button>
                  <button className="profilelargedisplay"></button>
                </div>
              </div>
            </div>
            <div
              className="homemobile"
              // style={{    margin: "0px 0px 0px 0px", display: "inline-block"}}
            >
              <div
                className="homemobileinner"
                style={{ padding: "20px 15px 0px 15px" }}
              >
                <div className="ndmobile">
                  <div
                    className="profileicon"
                    style={{
                      width: "100px",
                      margin: "0px 44px 0px 0px",
                      textAlign: "left",
                      padding: "0px 10px",
                      height: "29px",
                    }}
                  >
                    {/* <div> */}
                    <IoIosSearch />
                    {/* </div> */}
                  </div>

                  <button className="profilebutton">Search</button>
                </div>
                <div className="mobileinnerrmost">
                  <button className="profileSmalldisplay"></button>
                  <button className="profilelargedisplay"></button>
                  <button className="profileSmalldisplay"></button>
                  <button className="profilelargedisplay"></button>
                </div>
              </div>
            </div>
            <div className="homemobile">
              <div
                className="homemobileinner"
                style={{ padding: "20px 15px 0px 15px" }}
              >
                <div
                  className="ndmobile"
                  style={{ width: "100%", flexFlow: "row-reverse" }}
                >
                  <button
                    className="profilebutton"
                    style={{ alignItems: "end" }}
                  >
                    Apply
                  </button>
                </div>
                <div className="mobileinnerrmost">
                  <button className="profileSmalldisplay"></button>
                  <button className="profilelargedisplay"></button>
                  <button className="profileSmalldisplay"></button>
                  <button className="profilelargedisplay"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Container>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="text-center p-4 mb-5"
              style={{
                borderRadius: "0px 0px 40px 40px",
                backgroundColor: "rgb(22, 85, 143)",
                width: "85%",
                color: "whitesmoke",
              }}
            >
              <h2>Featured Jobs</h2>
              <p>The advice helped me feel prepared</p>
            </div>
          </div>
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ width: "85%" }}
          >
            <Row>
              {jobCategories.map((category, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>{category.title}</Card.Title>
                      <Card.Text>{category.openings} Openings</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <div className="text-center p-5">
            <a href="#explore-more">Explore More</a>
          </div>
        </Container>
      </section>
      <section>
        <div className="sectionThree">
          <h2 className="text-center my-4">Top companies Hiring Now</h2>
          <Carousel
            indicators={false}
            nextIcon={
              <span aria-hidden="true" className="carousel-control-next-icon" />
            }
            prevIcon={
              <span aria-hidden="true" className="carousel-control-prev-icon" />
            }
            className="custom-carousel"
          >
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                <div className="job-card">
                  <h3 className="company-logo">KOMATSU</h3>
                  <h4>Data Science</h4>
                  <p>Jaipur, Rajasthan</p>
                  <p>Full Time</p>
                  <button className="btn btn-primary">View jobs</button>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                <div className="job-card">
                  <h3 className="company-logo">NTT</h3>
                  <h4>Graphic Designer</h4>
                  <p>Kolkata, West Bengal</p>
                  <p>Full Time</p>
                  <button className="btn btn-primary">View jobs</button>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                <div className="job-card">
                  <h3 className="company-logo">JAL</h3>
                  <h4>UI Designer</h4>
                  <p>Delhi</p>
                  <p>Full Time</p>
                  <button className="btn btn-primary">View jobs</button>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
      <section
        id="promo-page-features"
        class="d-flex align-items-center py-5 bg-dark text-light"
        style={{ minHeight: "80vh" }}
      >
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-7">
              <h1 class="display-4">Our Service</h1>
              <h6 class="card-title">Elevate your career with us!</h6>
              <div class="row row-cols-1 row-cols-md-2 g-3 py-4">
                <div class="col">
                  <div class="card h-100 border-secondary text-bg-dark">
                    <div class="card-body">
                      <h5 class="card-title">Skill Development</h5>
                      <p class="card-text">
                        Transform Yourself: Build Essential Personal Development
                        Skills Today for a Better Tomorrow.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100 border-secondary text-bg-dark">
                    <div class="card-body">
                      <h5 class="card-title">Resume Writting</h5>
                      <p class="card-text">
                        Transform Your Resume into a Game-Changer: Capture
                        Attention and Unlock Career Opportunities!
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100 border-secondary text-bg-dark">
                    <div class="card-body">
                      <h5 class="card-title">Interview Coaching</h5>
                      <p class="card-text">
                        Master Your Interviews with Ease: Expert Coaching to
                        Help You Shine and Land Your Dream Job!
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100 border-secondary text-bg-dark">
                    <div class="card-body">
                      <h5 class="card-title">Career Counseling</h5>
                      <p class="card-text">
                        Navigate Your Career Path with Confidence: Expert
                        Counseling to Unlock Your Full Potential and Achieve
                        Your Goals!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <img
                src="{{asset('/images/promo/promo-page-features.svg')}}"
                alt="promo-page-features"
                class="w-100 img-fluid bg-random"
              />
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "rgb(22, 85, 143)" }}>
        <Container>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="text-center p-4 mb-5"
              style={{
                borderRadius: "0px 0px 40px 40px",
                backgroundColor: "white",
                width: "85%",
                color: "Black",
              }}
            >
              <h2>Success Stories</h2>
              <p>Join the community of 5 crore satisfied job seeker</p>
            </div>
          </div>
          <Container
            className="d-flex justify-content-center align-items-center pb-5"
            style={{ width: "85%" }}
          >
            <Carousel
              indicators={false}
              nextIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-next-icon"
                />
              }
              prevIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon"
                />
              }
              className="custom-carousel"
            >
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <div className="job-card">
                    <h3 className="company-logo">KOMATSU</h3>
                    <h4>Data Science</h4>
                    <p>Jaipur, Rajasthan</p>
                    <p>Full Time</p>
                    <button className="btn btn-primary">View jobs</button>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <div className="job-card">
                    <h3 className="company-logo">NTT</h3>
                    <h4>Graphic Designer</h4>
                    <p>Kolkata, West Bengal</p>
                    <p>Full Time</p>
                    <button className="btn btn-primary">View jobs</button>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <div className="job-card">
                    <h3 className="company-logo">JAL</h3>
                    <h4>UI Designer</h4>
                    <p>Delhi</p>
                    <p>Full Time</p>
                    <button className="btn btn-primary">View jobs</button>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </Container>
        </Container>
      </section>
      {/* <section>
        <div class="nI-gNb-slider bg-black">
          <div style={{transform: "translateX(-900px)", transition: "transform 0.45s ease-out", height: "100%", width: "3480px", display: "flex"}}>
            <ul class="nI-gNb-sc__main">
              <li class="slide-item bg-light">
                <div class="item">
                 aaaaaaaaaa
                </div>
              </li>
              <li class="slide-item">
                <div class="item">
                 bbbbbbbb
                </div>
              </li>
              <li class="slide-item">
                <div class="item">
                  ddddddddddddddd
                </div>
              </li>
              <li class="slide-item">
                <div class="item">
                  eeeeeeeeeeeeeeeec
                </div>
              </li>
              <li class="slide-item">
                <div class="item">
                  ccccccccccccc
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
