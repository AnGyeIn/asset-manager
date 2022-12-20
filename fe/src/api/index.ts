import axios, { AxiosResponse, isAxiosError } from "axios";
import {
  AccountBookEntry,
  AccountBookEntryUpdate,
} from "../models/accountBook";
import { YearMonth, YearMonthDate, YearsMonths } from "../models/calendar";
import {
  RepeatedAccountBookEntry,
  RepeatedAccountBookEntryUpdate,
} from "../models/repeatedAccountBookEntry";

const serverUrl = `${process.env.REACT_APP_SERVER_URL}/v0`;
const getUrl = (path: string) => `${serverUrl}${path}`;

interface Request {
  path: string;
  data?: any;
}

const GET = async ({ path, data }: Request) =>
  axios.get(getUrl(path), {
    params: data,
  });

const POST = async ({ path, data }: Request) => axios.post(getUrl(path), data);

const PATCH = async ({ path, data }: Request) =>
  axios.patch(getUrl(path), data);

const DELETE = async ({ path, data }: Request) =>
  axios.delete(getUrl(path), { params: data });

const checkResponse = async (
  method: (r: Request) => Promise<AxiosResponse>,
  request: Request
) => {
  try {
    const response = await method(request);
    return response;
  } catch (err) {
    console.error(err);
    if (isAxiosError(err)) {
      return err.response;
    }
  }
};

const api = {
  get: {
    accountBooksYearsAndMonths: async (): Promise<YearsMonths> => {
      const path = "/accountBooks/yearsAndMonths";
      const response = await checkResponse(GET, { path });
      return response?.data ?? {};
    },
    accountBookEntries: async (
      yearMonth: YearMonth
    ): Promise<AccountBookEntry[]> => {
      const path = "/accountBookEntries";
      const response = await checkResponse(GET, {
        path,
        data: yearMonth,
      });
      return response?.data ?? [];
    },
    repeatedAccountBookEntries: async (): Promise<
      RepeatedAccountBookEntry[]
    > => {
      const path = "/repeatedAccountBookEntries";
      const response = await checkResponse(GET, { path });
      return response?.data ?? [];
    },
  },

  post: {
    accountBook: async (yearMonth: YearMonth): Promise<number> => {
      const path = "/accountBook";
      const response = await checkResponse(POST, { path, data: yearMonth });
      return response?.data ?? -1;
    },
    accountBookEntry: async (yearMonthDate: YearMonthDate): Promise<number> => {
      const path = "/accountBookEntry";
      const response = await checkResponse(POST, { path, data: yearMonthDate });
      return response?.data ?? -1;
    },
    repeatedAccountBookEntry: async (
      repeatedAccountBookEntry: RepeatedAccountBookEntry
    ): Promise<number> => {
      const path = "/repeatedAccountBookEntry";
      const response = await checkResponse(POST, {
        path,
        data: repeatedAccountBookEntry,
      });
      return response?.data ?? -1;
    },
  },

  patch: {
    accountBookEntry: async (
      accountBookEntryId: number,
      accountBookEntryUpdate: AccountBookEntryUpdate
    ) => {
      const path = `/accountBookEntries/${accountBookEntryId}`;
      const response = await checkResponse(PATCH, {
        path,
        data: accountBookEntryUpdate,
      });
      return response?.status === 200;
    },
    repeatedAccountBookEntry: async (
      repeatedAccountBookEntryId: number,
      repeatedAccountBookEntry: RepeatedAccountBookEntryUpdate
    ) => {
      const path = `/repeatedAccountBookEntries/${repeatedAccountBookEntryId}`;
      const response = await checkResponse(PATCH, {
        path,
        data: repeatedAccountBookEntry,
      });
      return response?.status === 200;
    },
  },

  delete: {
    accountBookEntry: async (accountBookEntryId: number) => {
      const path = `/accountBookEntries/${accountBookEntryId}`;
      const response = await checkResponse(DELETE, { path });
      return response?.status === 200;
    },
    repeatedAccountBookEntry: async (repeatedAccountBookEntryId: number) => {
      const path = `/repeatedAccountBookEntries/${repeatedAccountBookEntryId}`;
      const response = await checkResponse(DELETE, { path });
      return response?.status === 200;
    },
  },
};

export default api;
