import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import environment from "../../Constant";

const baseURL = `${environment.baseUrl}`;
// export let user_id: any;

// if (localStorage.getItem("id") !== null) {
//   user_id = localStorage.getItem("id");
// }

// const id = parseInt(user_id);
// console.log(id);

// Initial State interface
export interface ticketState {
  userId?: number;
  authToken?: string;
  ticket: any[];
  error: string | null;
}

//Initial State

const initialState: ticketState = {
  ticket: [],
  error: "",
};

// Create New Ticket
export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticketData: any) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${baseURL}/api/tickets/create`,
      { ...ticketData },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log("create ticket response : ", res.data.data);
    return res.data.data;
  }
);

// Fetch Tickets
export const getdata = createAsyncThunk("ticket", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${baseURL}/api/tickets`, {
    headers: {
      authorization: token,
    },
  });
  console.log(res.data.data);
  return res.data.data;
});

// Edit Ticket
export const editTicket = createAsyncThunk(
  "ticket/edit",
  async (ticketData: any) => {
    let rearragedList;
    if (Array.isArray(ticketData)) {
      rearragedList = JSON.parse(JSON.stringify(ticketData[1]));
      ticketData = ticketData[0];
    }
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${baseURL}/api/tickets/${ticketData.id}`,
      ticketData,
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log("axios response : ", res.data.data);
    return rearragedList ? rearragedList : res.data.data;
  }
);

// Delete Ticket

export const deleteTicket = createAsyncThunk(
  "ticket/delete",
  async (ticketId: any) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${baseURL}/api/tickets/${ticketId}`, {
      headers: {
        authorization: token,
      },
    });
    return ticketId;
  }
);

// User Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: any) => {
    const res = await axios.post(`${baseURL}/api/users/login`, userData);
    return res.data.data;
  }
);

// User Logout
export const logoutUser = createAsyncThunk("user/logout", async () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem('id')
  await axios.delete(`${baseURL}/api/users/${user_id}`, {
    headers: {
      authorization: token,
    },
  });
});

// Ticket Slice
export const TicketSlic = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateTickets(state,{payload}){

      state.error = null;
      // if (Array.isArray(payload)) {
        // state.ticket = payload;
      // } else {
        state.ticket = state.ticket?.map((ticket) =>
        ticket.id === payload.id ? payload : ticket
        )
      return state;
    }     
  },
  // Extra reducers
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }: any) => {
        console.log("login response data: ", payload);
        state.ticket = payload;
        return state;
      })
      .addCase(getdata.fulfilled, (state, action: PayloadAction<any>) => {
        (state.error = null), (state.ticket = action.payload);
      })

      .addCase(editTicket.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
        if (Array.isArray(action.payload)) {
          state.ticket = action.payload;
        } else {
          state.ticket = state.ticket?.map((ticket) =>
            ticket.id === action.payload.id ? action.payload : ticket
          );
        }
        return state;
      })
      .addCase(deleteTicket.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
        state.ticket = state.ticket?.filter(
          (ticket) => ticket.id !== action.payload
        );
        return state;
      })

      .addCase(createTicket.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
        state.ticket.push(action.payload);
        return state;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.ticket = [];
        return state;
      });
  },
});
export const { updateTickets } = TicketSlic.actions;

export default TicketSlic.reducer;
