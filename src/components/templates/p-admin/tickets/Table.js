"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
import Swal from "sweetalert2";

export default function DataTable({ tickets, title }) {
  const router = useRouter();

  const showTicketBody = body => {
    showSwal(body, undefined, "بستن");
  };

  const answerToTicket = async (ticket) => {
  Swal.fire({
    title: "لطفا پاسخ مورد نظر را وارد کنید:",
    input: "textarea",
    inputAttributes: {
      "aria-label": "Type your message here",
      placeholder: "پاسخ خود را وارد کنید...",
      style: `
        height: 150px;
        width: 80%;
        max-width: 500px; /* حداکثر عرض */
        margin: 10px auto; /* وسط‌چین کردن */
        display: block;
        padding: 10px;
        border-radius: 5px;
        box-sizing: border-box;
      `, 
    },
    showCancelButton: true,
    confirmButtonText: "ثبت پاسخ",
    cancelButtonText: "لغو",
  }).then(async result => {
    if (result.isConfirmed && result.value) {
      const answer = {
        ...ticket,
        body: result.value,
        ticketID: ticket._id,
      };

      const res = await fetch("/api/tickets/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answer),
      });

      if (res.status === 201) {
        Swal.fire({
          title: "پاسخ مورد نظر ثبت شد",
          icon: "success",
          buttons: "فهمیدم",
        });
      }
    }
  });
};


  return (
    <div>
      <div>
        <h1 className="text-right text-2xl font-medium relative pt-8 text-gray-700 uppercase">
          <span className="bg-white px-4 mr-16 hover:text-black">{title}</span>
        </h1>
      </div>
      <div className="overflow-x-auto px-6 py-4">
        <table className="min-w-full table-auto bg-[#f2f7fd]">
          <thead>
            <tr>
              <th className="px-6 py-2 text-black text-center">شناسه</th>
              <th className="px-6 py-2 text-black text-center">کاربر</th>
              <th className="px-6 py-2 text-black text-center">عنوان</th>
              <th className="px-6 py-2 text-black text-center">دپارتمان</th>
              <th className="px-6 py-2 text-black text-center">مشاهده</th>
              <th className="px-6 py-2 text-black text-center">پاسخ</th>
              <th className="px-6 py-2 text-black text-center">بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id} className="bg-white">
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-center">{ticket.user.name}</td>
                <td className="px-6 py-4 text-center">{ticket.title}</td>
                <td className="px-6 py-4 text-center">
                  {ticket.department.title}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    className="bg-black text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => showTicketBody(ticket.body)}>
                    مشاهده
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    className="bg-[#711d1c] text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => answerToTicket(ticket)}>
                    پاسخ
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    className="bg-[#711d1c] text-white px-3 py-1 rounded-md text-sm">
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
