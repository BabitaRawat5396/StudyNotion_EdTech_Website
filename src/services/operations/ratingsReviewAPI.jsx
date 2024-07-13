import { apiConnector } from "../apiConnector";
import { ratingsEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const {
  GET_ALL_REVIEWS_DETAILS_API,
  CREATE_RATINGS_REVIEWS_API,
  UPDATE_RATINGS_REVIEWS_API,
  REVIEWS_SPECIFIC_COURSE_USER_API,
  GET_RATINGS_REVIEWS_COURSE_SPECIFIC_API,
} = ratingsEndpoints;

export function createRatingsReviews(data, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_RATINGS_REVIEWS_API,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("CREATE_RATINGS_REVIEWS_API", error);
      toast.error("Couldn't create ratings and reviews");
    }
  };
}

export function updateRatingsReviews(data, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_RATINGS_REVIEWS_API,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("UPDATE_RATINGS_REVIEWS_API", error);
      toast.error("Couldn't update ratings and reviews");
    }
  };
}

export const getRatingReviewSpecificCourse = async (courseId, token) => {
  let result;
  try {
    const response = await apiConnector(
      "POST",
      REVIEWS_SPECIFIC_COURSE_USER_API,
      courseId,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.courseSpecificReview;
  } catch (error) {
    console.log("REVIEWS_SPECIFIC_COURSE_USER_API", error);
    toast.error("COuldn't get ratings and reviews");
  }
  return result;
};

export const getAllRatingsReview = async () => {
  let result;
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_REVIEWS_DETAILS_API,
      null
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.allReviews;
  } catch (error) {
    console.log("GET_ALL_REVIEWS_DETAILS_API_ERROR", error);
    toast.error("Couldn't get ALL ratings and reviews");
  }
  return result;
};

export const getAllRatingsReviewCourse = async (courseId) => {
  let result;
  try {
    const response = await apiConnector(
      "POST",
      GET_RATINGS_REVIEWS_COURSE_SPECIFIC_API,
      courseId
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.allRatingsReviews;
  } catch (error) {
    console.log("GET_RATINGS_REVIEWS_COURSE_SPECIFIC_API_ERROR", error);
    toast.error("Couldn't get ALL ratings and reviews of this course");
  }
  return result;
};
