import "editor.css";
import icon from "assets/icon.jpg";
import { Rating } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import apiList from "libs/apiList";
export default function JobAd({ job, tags, about, edit }) {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    if (about) {
      const userID = about.userId;
      console.log("user id: ", userID);
      axios.get(`${apiList.allRecruiter}`).then((response) => {
        const filteredRecruiters = response.data.allUser.filter(
          (recruiter) => recruiter.userId === userID
        );
        setRecruiters(filteredRecruiters);
      });
    }
  }, [about]);

  const deadline =
    about && about.deadline
      ? new Date(about.deadline).toLocaleDateString()
      : "";

  function calculateDays(date) {
    let daysAgo = Math.floor((new Date() - date) / (1000 * 3600 * 24));

    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) {
      return daysAgo + " day ago";
    } else if (daysAgo < 7) {
      return daysAgo + " days ago";
    } else if (daysAgo < 14) {
      return "1 week ago";
    } else if (daysAgo < 30) {
      return Math.floor(daysAgo / 7) + " weeks ago";
    } else if (daysAgo < 60) {
      return "1 month ago";
    } else {
      return Math.floor(daysAgo / 30) + " months ago";
    }
  }

  return (
    <>
      {job && (
        <div className="w-11/12 mx-auto mt-20 pb-8">
          <div className="flex">
            {/* <img
              alt="company logo"
              className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
              src={icon}
            /> */}

            <div>
              <h1 className="font-semibold lg:text-4xl text-2xl mt-3">
                {job?.title || "Job title"}
              </h1>
              <h6 className="md:text-xl text-lg ">{"Company"}</h6>
            </div>
          </div>
          <div className="flex justify-between md:mt-12 mt-12 mb-3">
            <h1 className="text-3xl font-medium ">Summary</h1>
          </div>
          <table className="table-auto w-full mb-3">
            <tbody className="text-xl">
              <tr>
                <td className="text-bold">Salary reward</td>
                <td className="text-right">{job.salary || ""} $</td>
              </tr>

              <tr>
                <td className="text-bold">Skills</td>
                <td className="text-right">
                  <div className="flex flex-row-reverse gap-1">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                      >
                        <span className="">{tag}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-bold">duration</td>
                <td className="text-right">{job.duration || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">deadline</td>
                <td className="text-right">{job.deadline || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxApplicants</td>
                <td className="text-right">{job.maxApplicants || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxPositions</td>
                <td className="text-right">{job.maxPositions || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">Location: </td>
                <td className="text-right">{job.location || ""}</td>
              </tr>
            </tbody>
          </table>
          <div className="my-8">
            <h1 className="text-3xl font-medium mb-2">About the job</h1>
            <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
          </div>
        </div>
      )}
      {edit && (
        <div className="w-11/12 mx-auto mt-20 pb-8">
          <div className="flex">
            <img
              alt="company logo"
              className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
              src={icon}
            />

            <div>
              <h1 className="font-semibold lg:text-4xl text-2xl mt-3">
                {edit?.title || "Job title"}
              </h1>
              <h6 className="md:text-xl text-lg ">{"Company"}</h6>
            </div>
          </div>
          <div className="flex justify-between md:mt-12 mt-12 mb-3">
            <h1 className="text-3xl font-medium ">Summary</h1>
          </div>
          <table className="table-auto w-full mb-3">
            <tbody className="text-xl">
              <tr>
                <td className="text-bold">Salary reward</td>
                <td className="text-right">{edit.salary || ""} $</td>
              </tr>

              <tr>
                <td className="text-bold">Skills</td>
                <td className="text-right">
                  {edit.skillsets && (
                    <div className="flex flex-row-reverse gap-1">
                      {edit.skillsets.map((tag, index) => (
                        <div
                          key={index}
                          className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                        >
                          <span className="">{tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td className="text-bold">duration</td>
                <td className="text-right">{edit.duration || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">deadline</td>
                <td className="text-right">{edit.deadline || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxApplicants</td>
                <td className="text-right">{edit.maxApplicants || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxPositions</td>
                <td className="text-right">{edit.maxPositions || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">Location: </td>
                <td className="text-right">{edit.location || ""}</td>
              </tr>
            </tbody>
          </table>
          <div className="my-8">
            <h1 className="text-3xl font-medium mb-2">About the job</h1>
            <div dangerouslySetInnerHTML={{ __html: edit.description }}></div>
          </div>
        </div>
      )}
      {about && (
        <div className="rounded-xl bg-[#f6f6f6] pd:pt-1 pt-1 shadow-sm">
          <div className="w-11/12 mx-auto mt-10 pb-4">
            <div className="flex">
              {recruiters.map((recruiter, index) => (
                <img
                  key={index}
                  alt="company logo"
                  className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
                  src={recruiter.profile}
                />
              ))}

              <div>
                <h1 className="font-semibold lg:text-4xl text-4xl mt-3">
                  {about?.title || "Job title"}
                </h1>
                <h6 className="md:text-xl text-lg ">{"Company"}</h6>
              </div>
            </div>
            <div className="flex justify-start md:mt-10 mt-10 mb-3 gap-5">
              {" "}
              <Rating
                value={about.rating !== -1 ? about.rating : null}
                readonly
              />
              <h6 className="md:text-xl text-lg font-semibold">
                {about.rating}
              </h6>
            </div>
            <hr className="my-8 border-gray-300" />

            <div className="flex justify-between md:mt-10 mt-10 mb-3">
              <h1 className="text-3xl font-medium ">Summary</h1>
            </div>
            <table className="table-auto w-full mb-3">
              <tbody className="text-xl">
                <tr>
                  <td className="text-bold">Salary reward</td>
                  <td className="text-right">{about.salary || ""} $</td>
                </tr>
                <tr>
                  <td className="text-bold">duration</td>
                  <td className="text-right">{about.duration || ""}</td>
                </tr>
                <tr>
                  <td className="text-bold">deadline</td>
                  <td className="text-right">
                    {calculateDays(new Date(about.dateOfPosting))}
                  </td>
                </tr>
                <tr>
                  <td className="text-bold">maxApplicants</td>
                  <td className="text-right">{about.maxApplicants || ""}</td>
                </tr>
                <tr>
                  <td className="text-bold">maxPositions</td>
                  <td className="text-right">{about.maxPositions || ""}</td>
                </tr>

                <tr>
                  <td className="text-bold">Skills</td>
                  <td className="text-right">
                    <div className="flex flex-row-reverse gap-1">
                      {about.skillsets.map((tag, index) => (
                        <div
                          key={index}
                          className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                        >
                          <span className="">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-bold">Location: </td>
                  <td className="text-right">{about.location || ""}</td>
                </tr>
              </tbody>
            </table>
            <hr className="my-8 border-gray-300" />
            <div className="my-8">
              <h1 className="text-3xl font-medium mb-2">About the job</h1>
              <div
                dangerouslySetInnerHTML={{ __html: about.description }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
