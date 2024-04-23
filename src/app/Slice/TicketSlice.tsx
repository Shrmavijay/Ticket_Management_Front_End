import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const token = localStorage.getItem("token");
export let user_id: any;
if (localStorage.getItem("id") !== null) {
  user_id = localStorage.getItem("id");
}

const id = parseInt(user_id);
console.log(id);
export interface ticketState {
  ticket: any[];
  isLogin: boolean;
  error: string | null;
}
// export interface Ticket {
//   id: number;
//   title: string;
//   description: string;
//   priority: string;
//   status: string;
//   due_date: string;
// }
const initialState: ticketState = {
  ticket: [],
  isLogin: false,
  error: "",
};

export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticketData: any) => {
    const res = await axios.post(
      `http://192.168.1.10:8080/api/tickets/create`,
      { ...ticketData, user_id: id },
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

export const getdata = createAsyncThunk("ticket", async () => {
  const res = await axios.get("http://192.168.1.10:8080/api/tickets",{
    headers: {
      authorization: token,
    },
  });
  console.log(res.data.data);
  return res.data.data;
});

export const editTicket = createAsyncThunk(
  "ticket/edit",
  async (ticketData: any) => {
    let rearragedList;
    if(Array.isArray(ticketData)){
      rearragedList = JSON.parse(JSON.stringify(ticketData[1]));
      ticketData = ticketData[0]
    }
    const res = await axios.put(
      `http://192.168.1.10:8080/api/tickets/${ticketData.id}`,
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

export const deleteTicket = createAsyncThunk(
  "ticket/delete",
  async (ticketId: any) => {
    await axios.delete(`http://192.168.1.10:8080/api/tickets/${ticketId}`, {
      headers: {
        authorization: token,
      },
    });
    return ticketId;
  }
);

export const loginUser = createAsyncThunk("user/login", async () => {
  const response = await axios.post("http://192.168.1.10:8080/api/users/login");
  
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await axios.delete(`http://192.168.1.10:8080/api/users/${user_id}`, {
    headers: {
      authorization: token,
    },
  });
});

export const TicketSlic = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state,{payload}:any) => {
        state.isLogin = true;
        state.ticket = payload
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
        state.isLogin = false;
        state.ticket = [];
        return state;
      });
  },
});

export default TicketSlic.reducer;
