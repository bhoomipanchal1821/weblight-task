import "./Repo.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchCommitData } from "./commitdataThunks";

const CommitChart = ({ owner, repo }, { chartRef, setChartInfo }) => {
  const dispatch = useDispatch();
  const commitData = useSelector((state) => state.commitData);
  const [selectedOption, setSelectedOption] = useState("totalChanges"); // Default to total changes

  useEffect(() => {
    dispatch(fetchCommitData(owner, repo));
  }, [dispatch, owner, repo]);

  const getSeries = () => {
    const contributors = Array.from(
      new Set(commitData?.map((commit) => commit.author))
    );
    return contributors.map((contributor) => {
      const contributorCommits = commitData.filter(
        (commit) => commit.author === contributor
      );
      const weeklyChanges = contributorCommits.map(
        (commit) => commit[selectedOption]
      );
      return {
        name: contributor,
        data: weeklyChanges,
      };
    });
  };

  const [options] = useState({
    series: [
      {
        data: [2, 7, 5, 1, 4],
      },
      {
        data: [4, 3, 5, 6, 2, 3],
      },
    ],
  });

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <select
        onChange={(e) => handleDropdownChange(e.target.value)}
        className="float-end "
      >
        <option value="additions">Additions</option>
        <option value="deletions">Deletions</option>
        <option value="totalChanges">Total Changes</option>
      </select>

      <hr />
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default CommitChart;
