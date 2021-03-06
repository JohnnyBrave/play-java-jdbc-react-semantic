// @flow
import { fromJS } from "immutable";

import {
  LOCATION_ADD_SUCCESS,
  LOCATION_ADD_FAIL,
  LOCATION_SAVE_SUCCESS,
  LOCATION_SAVE_FAIL,
  LOCATION_UPDATE_SUCCESS,
  LOCATION_UPDATE_FAIL,
  LOCATION_SEARCH_SUCCESS,
  LOCATION_SEARCH_FAIL,
  LOCATION_GET_SUCCESS,
  LOCATION_GET_FAIL,
  LOCATION_DELETE_SUCCESS,
  LOCATION_DELETE_FAIL,
  LOCATION_SET_COUNTRY_SUCCESS,
  LOCATION_DELETE_COUNTRY_SUCCESS
} from "common/actions/location";

import { APPLICATION_INIT } from "actions/common";

import type {
  LOCATION_ADD_SUCCESS_TYPE,
  LOCATION_ADD_FAIL_TYPE,
  LOCATION_SAVE_SUCCESS_TYPE,
  LOCATION_SAVE_FAIL_TYPE,
  LOCATION_UPDATE_SUCCESS_TYPE,
  LOCATION_UPDATE_FAIL_TYPE,
  LOCATION_SEARCH_SUCCESS_TYPE,
  LOCATION_SEARCH_FAIL_TYPE,
  LOCATION_GET_SUCCESS_TYPE,
  LOCATION_GET_FAIL_TYPE,
  LOCATION_DELETE_SUCCESS_TYPE,
  LOCATION_DELETE_FAIL_TYPE,
  LOCATION_SET_COUNTRY_SUCCESS_TYPE,
  LOCATION_DELETE_COUNTRY_SUCCESS_TYPE
} from "common/actions/location";
import type { APPLICATION_INIT_TYPE } from "actions/common";

export type Location = {
  streetAddress: string,

  postalCode: string,

  city: string,

  stateProvince: string
};
export type State = {
  search: string,
  location: Location,
  locations: [Location],
  start: number,
  limit: number,
  totalItemsCount: number,
  otherSearchStart: number,
  otherSearchLimit: number,
  otherSearchTotalItemsCount: number,
  otherSearchLocations: [Location],
  error: Object
};

type Action =
  | APPLICATION_INIT_TYPE
  | LOCATION_ADD_SUCCESS_TYPE
  | LOCATION_ADD_FAIL_TYPE
  | LOCATION_SAVE_SUCCESS_TYPE
  | LOCATION_SAVE_FAIL_TYPE
  | LOCATION_UPDATE_SUCCESS_TYPE
  | LOCATION_UPDATE_FAIL_TYPE
  | LOCATION_SEARCH_SUCCESS_TYPE
  | LOCATION_SEARCH_FAIL_TYPE
  | LOCATION_GET_SUCCESS_TYPE
  | LOCATION_GET_FAIL_TYPE
  | LOCATION_DELETE_SUCCESS_TYPE
  | LOCATION_DELETE_FAIL_TYPE
  | LOCATION_SET_COUNTRY_SUCCESS_TYPE
  | LOCATION_DELETECOUNTRY_SUCCESS_TYPE;

export const initialState = {
  search: "",
  location: {},
  locations: [],
  start: 0,
  limit: 10,
  totalItemsCount: 0,
  otherSearchStart: 0,
  otherSearchLimit: 10,
  otherSearchTotalItemsCount: 0,
  otherSearchLocations: [],
  error: ""
};

export function locationReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case APPLICATION_INIT:
      return { ...initialState, ...state };

    case LOCATION_ADD_SUCCESS: {
      return { ...state, location: action.payload };
    }
    case LOCATION_ADD_FAIL: {
      return { ...state, error: action.error };
    }

    case LOCATION_SAVE_SUCCESS: {
      return { ...state, location: action.payload };
    }
    case LOCATION_SAVE_FAIL: {
      return { ...state, error: action.error };
    }

    case LOCATION_UPDATE_SUCCESS: {
      return { ...state, location: action.payload };
    }
    case LOCATION_UPDATE_FAIL: {
      return { ...state, error: action.error };
    }

    case LOCATION_SEARCH_SUCCESS: {
      return {
        ...state,
        locations: action.payload,
        totalItemsCount: action.total
      };
    }
    case LOCATION_SEARCH_FAIL: {
      return { ...state, error: action.error };
    }

    case LOCATION_GET_SUCCESS: {
      return { ...state, location: action.payload };
    }
    case LOCATION_GET_FAIL: {
      return { ...state, error: action.error };
    }

    case LOCATION_DELETE_SUCCESS: {
      let locations = state.locations;
      let newLocations = locations.filter(
        item => item._id !== action.payload._id
      );
      return { ...state, location: {}, locations: newLocations };
    }
    case LOCATION_DELETE_FAIL: {
      return { ...state, error: action.error };
    }

    case LOCATION_SET_COUNTRY_SUCCESS: {
      return {
        ...state,
        location: {
          ...state.location,
          country: action.country
        }
      };
    }
    case LOCATION_DELETE_COUNTRY_SUCCESS: {
      return {
        ...state,
        location: {
          ...state.location,
          country: null
        }
      };
    }

    default:
      return state;
  }
}
