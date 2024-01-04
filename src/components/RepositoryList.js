import "./Repo.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepositories } from "../redux/repositoriesSlice";

import DynamicHighchart from "./DropDownChart";
import Button from "@mui/material/Button";
const RepositoryList = () => {
  const owner = "your-github-owner";
  const repo = "your-github-repo";

  const dispatch = useDispatch();
  const repositories = useSelector((state) => state.repositories.data);
  const page = useSelector((state) => state.repositories.page);

  const [timePeriod, setTimePeriod] = useState("1w");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const bottomOfListRef = useRef(null);

  useEffect(() => {
    const date = new Date();
    let createdSince;

    switch (timePeriod) {
      case "1w":
        createdSince = new Date(date.setDate(date.getDate() - 7)).toISOString();
        break;
      case "2w":
        createdSince = new Date(
          date.setDate(date.getDate() - 14)
        ).toISOString();
        break;
      case "1m":
        createdSince = new Date(
          date.setMonth(date.getMonth() - 1)
        ).toISOString();
        break;
      default:
        createdSince = null;
    }

    if (createdSince) {
      dispatch(
        fetchRepositories({
          q: `created:>${createdSince}`,
          sort: "stars",
          order: "desc",
          per_page: 10,
        })
      );
    }
  }, [dispatch, timePeriod]);

  const handleScroll = () => {
    if (
      bottomOfListRef.current &&
      bottomOfListRef.current.getBoundingClientRect().bottom <=
        window.innerHeight
    ) {
      dispatch(
        fetchRepositories({
          q: `created:>${new Date().toISOString()}`,
          sort: "stars",
          order: "desc",
          per_page: 10,
          page: page + 1,
        })
      );
    }
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
  };

  return (
    <div>
      <form className="d-flex align-items-center flex-column mb-3">
        <label className="mt-5">
          Select Time Period :
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="ms-3"
          >
            <option value="1w">1 Week</option>
            <option value="2w">2 Weeks</option>
            <option value="1m">1 Month</option>
          </select>
        </label>
        <Button variant="text" className="mt-5">
          Search
        </Button>
      </form>
      <div className=" mt-5">
        <h2 className="text-center">
          Top Repositories (Last{" "}
          {timePeriod === "1w"
            ? "Week"
            : timePeriod === "2w"
            ? "2 Weeks"
            : "Month"}
          )
        </h2>

        {repositories?.map((repo) => (
          <div key={repo.id.value}>
            <div className=" d-flex main mt-5">
              <p className="border p-1 border-3">
                <img
                  src={repo.owner.avatar_url}
                  className="img_width col-md-12 p-2 "
                />
              </p>
              <div className="row row-cols-2">
                <p className="w-100 ms-5 mt-3">{repo.name}</p>
                <p className=" w-100 ms-5">{repo.description}</p>
                <p className="border border-3 count ms-5 align-self-center text-center">
                  {repo.stargazers_count} Stars
                </p>
                <p className="border border-3 count ms-5 align-self-center text-center">
                  {repo.open_issues} issues
                </p>

                <p className="text-end flex-column">
                  Last Pushed {repo.pushed_at} by {repo.name}
                </p>
              </div>

              <hr />
            </div>
            <DynamicHighchart owner={owner} repo={repo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryList;
