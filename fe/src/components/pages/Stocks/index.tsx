import { Lock } from "@mui/icons-material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import api from "../../../api";
import { Canceler } from "../../../models/control";
import {
  Preservation,
  StocksAccount,
  StocksLiveInfo,
} from "../../../models/stocks";
import { setUnavailableBalance } from "../../../store/slices/balanceSlice";
import PreservationsPopupContent from "./PreservationsPopupContent";
import StocksWeightManagingTable from "./StocksWeightManagingTable";

const Stocks = () => {
  const dispatch = useDispatch();

  const [preservations, setPreservations] = useState<Preservation[]>([]);
  const [stocksAccounts, setStocksAccounts] = useState<StocksAccount[]>([]);
  const [stocksLiveInfosSet, setStocksLiveInfosSet] = useState<
    StocksLiveInfo[][]
  >([]);
  const [isPreservationsPopupOpen, setIsPreservationsPopupOpen] =
    useState(false);

  const stocksAccountsTotalValues = useMemo(
    () =>
      stocksLiveInfosSet.map((stocksLiveInfos) =>
        stocksLiveInfos.reduce(
          (sum, { floatingValue, value }) => sum + floatingValue + value,
          0
        )
      ),
    [stocksLiveInfosSet]
  );

  const fetchPreservations = useCallback(async (canceler?: Canceler) => {
    const _preservations = await api.get.preservations();
    if (canceler?.cancel) {
      return;
    }
    setPreservations(_preservations);
  }, []);

  const fetchStocksAccounts = useCallback(async (canceler?: Canceler) => {
    const _stocksAccounts = await api.get.stocksAccounts();
    if (canceler?.cancel) {
      return;
    }
    setStocksAccounts(_stocksAccounts);
  }, []);

  const openPreservationsPopup = useCallback(
    () => setIsPreservationsPopupOpen(true),
    []
  );

  const closePreservationsPopup = useCallback(
    () => setIsPreservationsPopupOpen(false),
    []
  );

  useEffect(() => {
    const canceler = { cancel: false };
    fetchPreservations(canceler);
    fetchStocksAccounts(canceler);
    return () => {
      canceler.cancel = true;
    };
  }, [fetchPreservations, fetchStocksAccounts]);

  useEffect(() => {
    dispatch(
      setUnavailableBalance(
        preservations.reduce(
          (sum, { active, amount }) => (active ? sum + amount : sum),
          0
        )
      )
    );
  }, [dispatch, preservations]);

  useEffect(() => {
    const canceler = { cancel: false };
    (async () => {
      const _stocksLiveInfosSet = await Promise.all(
        stocksAccounts.map(
          async ({ stocksList }) =>
            await Promise.all(
              stocksList.map(
                async ({ code, stocksType, floatingStocksNum, stocksNum }) => {
                  // TODO: crawling to get name and stocks with code and stocksType
                  const name = "test";
                  const price = 1000;

                  return {
                    name,
                    price,
                    floatingValue: price * Number(floatingStocksNum),
                    value: price * Number(stocksNum),
                  };
                }
              )
            )
        )
      );
      setStocksLiveInfosSet(_stocksLiveInfosSet);
    })();
    return () => {
      canceler.cancel = true;
    };
  }, [stocksAccounts]);

  return (
    <>
      <Lock onClick={openPreservationsPopup} />
      <Popup
        open={isPreservationsPopupOpen}
        modal
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <PreservationsPopupContent
          preservations={preservations}
          reload={fetchPreservations}
          close={closePreservationsPopup}
        />
      </Popup>
      <StocksWeightManagingTable
        stocksAccounts={stocksAccounts}
        stocksAccountsTotalValues={stocksAccountsTotalValues}
        reload={fetchStocksAccounts}
      />
    </>
  );
};

export default Stocks;
