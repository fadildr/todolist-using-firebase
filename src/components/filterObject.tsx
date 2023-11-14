import React, { useState, useEffect } from "react";

interface BillDetail {
  adminfee: string;
  billid: string;
  currency: string;
  title: string;
  totalamount: string;
  descriptions: null | string;
  body: {
    DENOM: number;
  };
}

interface Data {
  status: number;
  message: string;
  data: {
    system_message: string;
    RESPONSE: {
      additionaldata: [];
      billdetails: BillDetail[];
      billername: string;
      inquiryid: string;
      paymenttype: string;
      responsecode: string;
      responsemsg: string;
      subscriberid: string;
      subscribername: string;
    };
    trace: {
      session_id: string;
      request_date_time: string;
      words: string;
      biller_id: string;
      account_number: string;
      systrace: string;
      inquiry_id: string;
    };
  };
}

const FilterDataComponent: React.FC = () => {
  const [dataBeforeFilter, setDataBeforeFilter] = useState<number[]>([]);
  const [dataAfterFilter, setDataAfterFilter] = useState<number[]>([]);
  const data: Data = {
    status: 1,
    message: "sukses",
    data: {
      system_message: "SUCCESS",
      RESPONSE: {
        additionaldata: [],
        billdetails: [
          {
            adminfee: "0.0",
            billid: "8",
            currency: "360",
            title: "TELKOMSEL 50rb - 50.149",
            totalamount: "50149.00",
            descriptions: null,
            body: { DENOM: 50000 },
          },
          {
            adminfee: "0.0",
            billid: "9",
            currency: "360",
            title: "TELKOMSEL 75rb - 74.050",
            totalamount: "74050.00",
            descriptions: null,
            body: { DENOM: 75000 },
          },
          {
            adminfee: "0.0",
            billid: "10",
            currency: "360",
            title: "TELKOMSEL 100rb - 98.264",
            totalamount: "98264.00",
            descriptions: null,
            body: { DENOM: 100000 },
          },
          {
            adminfee: "0.0",
            billid: "11",
            currency: "360",
            title: "TELKOMSEL 150rb - 146.600",
            totalamount: "146600.00",
            descriptions: null,
            body: { DENOM: 150000 },
          },
          {
            adminfee: "0.0",
            billid: "12",
            currency: "360",
            title: "TELKOMSEL 200rb - 194.900",
            totalamount: "194900.00",
            descriptions: null,
            body: { DENOM: 200000 },
          },
        ],
        billername: "PULSA TSEL",
        inquiryid: "271990993",
        paymenttype: "CLOSE_PAYMENT",
        responsecode: "0000",
        responsemsg: "SUCCESS",
        subscriberid: "081311529594",
        subscribername: "",
      },
      trace: {
        session_id: "K345K3G4KJ3G4JH3J4HGK",
        request_date_time: "20190704185319",
        words: "65s4d65fsd876sdfs76dsdcv7",
        biller_id: "9900002",
        account_number: "081311529594",
        systrace: "081311529594",
        inquiry_id: "27190993",
      },
    },
  };
  useEffect(() => {
    // Menyimpan data sebelum difilter
    setDataBeforeFilter(
      data.data.RESPONSE.billdetails.map((item: BillDetail) => item.body.DENOM)
    );

    // Filtering data
    const filteredData = data.data.RESPONSE.billdetails.filter(
      (item: BillDetail) => item.body.DENOM >= 100000
    );

    // Menyimpan data setelah difilter
    setDataAfterFilter(filteredData.map((item: BillDetail) => item.body.DENOM));
  }, []);
  console.log("Before Filter : ", dataBeforeFilter);
  console.log("After Filter : ", dataAfterFilter);
  return (
    <div className="flex justify-center ">
      <div className=" mb-5">
        <pre>
          <code className="language-ts">
            {`
useEffect(() => {
  // Menyimpan data sebelum difilter
  setDataBeforeFilter(
    data.data.RESPONSE.billdetails.map((item: BillDetail) => item.body.DENOM)
  );

  // Filtering data
  const filteredData = data.data.RESPONSE.billdetails.filter(
    (item: BillDetail) => item.body.DENOM >= 100000
  );

  // Menyimpan data setelah difilter
  setDataAfterFilter(filteredData.map((item: BillDetail) => item.body.DENOM));
}, []);
console.log("Before Filter : ", dataBeforeFilter);  
console.log("After Filter : ", dataAfterFilter);
        `}
          </code>
        </pre>
        <h2>Data Sebelum Filter:</h2>
        <p>{dataBeforeFilter.join(", ")}</p>

        <h2>Data Setelah Filter:</h2>
        <p>{dataAfterFilter.join(", ")}</p>
      </div>
    </div>
  );
};

export default FilterDataComponent;
