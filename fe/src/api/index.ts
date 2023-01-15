import axios, { AxiosResponse, isAxiosError } from "axios";
import {
  AccountBookEntry,
  AccountBookEntryUpdate,
  RepeatedAccountBookEntry,
  RepeatedAccountBookEntryUpdate,
} from "../models/accountBook";
import { YearMonth, YearMonthDate, YearsMonths } from "../models/calendar";
import {
  Preservation,
  PreservationCreate,
  PreservationUpdate,
  StocksAccount,
  StocksAccountUpdate,
  StocksCreate,
  StocksUpdate,
} from "../models/stocks";
import { TitlesDescriptions } from "../models/store";

const serverUrl = `${process.env.REACT_APP_SERVER_URL}/v0`;
const getUrl = (path: string) => `${serverUrl}${path}`;

type Request = {
  path: string;
  data?: any;
};

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
    accountBookEntriesTitlesAndDescriptions:
      async (): Promise<TitlesDescriptions> => {
        const path = "/accountBookEntries/titlesAndDescriptions";
        const response = await checkResponse(GET, { path });
        return (
          response?.data ?? {
            titles: [],
            descriptions: [],
          }
        );
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
    preservations: async (): Promise<Preservation[]> => {
      const path = "/preservations";
      const response = await checkResponse(GET, { path });
      return response?.data ?? [];
    },
    stocksAccounts: async (): Promise<StocksAccount[]> => {
      const path = "/stocksAccounts";
      const response = await checkResponse(GET, { path });
      return response?.data ?? [];
    },
  },

  post: {
    accountBook: async (yearMonth: YearMonth): Promise<number> => {
      const path = "/accountBook";
      const response = await checkResponse(POST, { path, data: yearMonth });
      return Number(response?.data);
    },
    accountBookEntry: async (yearMonthDate: YearMonthDate): Promise<number> => {
      const path = "/accountBookEntry";
      const response = await checkResponse(POST, { path, data: yearMonthDate });
      return Number(response?.data);
    },
    repeatedAccountBookEntry: async (
      repeatedAccountBookEntry: RepeatedAccountBookEntryUpdate
    ): Promise<number> => {
      const path = "/repeatedAccountBookEntry";
      const response = await checkResponse(POST, {
        path,
        data: repeatedAccountBookEntry,
      });
      return Number(response?.data);
    },
    preservation: async (preservation: PreservationCreate): Promise<number> => {
      const path = "/preservation";
      const response = await checkResponse(POST, {
        path,
        data: preservation,
      });
      return Number(response?.data);
    },
    stocksAccount: async (
      stocksAccount: StocksAccountUpdate
    ): Promise<number> => {
      const path = "/stocksAccount";
      const response = await checkResponse(POST, {
        path,
        data: stocksAccount,
      });
      return Number(response?.data);
    },
    stocks: async (stocks: StocksCreate): Promise<string> => {
      const path = "/stocks";
      const response = await checkResponse(POST, {
        path,
        data: stocks,
      });
      return response?.data ?? "";
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
    preservation: async (
      preservationId: number,
      preservation: PreservationUpdate
    ) => {
      const path = `/preservations/${preservationId}`;
      const response = await checkResponse(PATCH, {
        path,
        data: preservation,
      });
      return response?.status === 200;
    },
    stocksAccount: async (
      stocksAccountId: number,
      stocksAccount: StocksAccountUpdate
    ) => {
      const path = `/stocksAccounts/${stocksAccountId}`;
      const response = await checkResponse(PATCH, {
        path,
        data: stocksAccount,
      });
      return response?.status === 200;
    },
    stocks: async (code: string, stocks: StocksUpdate) => {
      const path = `/stocks/${code}`;
      const response = await checkResponse(POST, {
        path,
        data: stocks,
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
    preservation: async (preservationId: number) => {
      const path = `/preservations/${preservationId}`;
      const response = await checkResponse(DELETE, { path });
      return response?.status === 200;
    },
    stocksAccount: async (stocksAccountId: number) => {
      const path = `/stocksAccounts/${stocksAccountId}`;
      const response = await checkResponse(DELETE, { path });
      return response?.status === 200;
    },
    stocks: async (code: string) => {
      const path = `/stocks/${code}`;
      const response = await checkResponse(DELETE, { path });
      return response?.status === 200;
    },
  },
};

export default api;
