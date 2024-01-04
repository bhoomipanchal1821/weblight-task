import axios from "axios";
import {
  fetchCommitDataStart,
  fetchCommitDataSuccess,
  fetchCommitDataFailure,
} from "../redux/chartdataSlice";
export const fetchCommitData = (owner, repo) => async (dispatch) => {
  try {
    dispatch(fetchCommitDataStart());

    const response = await axios.get(
      `https://api.github.com/repos/octocat/hello-world/stats/code_frequency/${owner}/${repo}`
    );
    const data = response.data;

    dispatch(fetchCommitDataSuccess(data));
  } catch (error) {
    dispatch(fetchCommitDataFailure(error.message));
  }
};
