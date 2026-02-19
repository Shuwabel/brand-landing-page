/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function DashboardClient({ users }: { users: any[] }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="relative p-10">
      {/* Dashboard Content */}
      <div className={unlocked ? "" : "blur-md pointer-events-none"}>
        <h1 className="text-3xl font-bold mb-8 text-center porsha">
          Waitlist Dashboard
        </h1>

        <table className="w-full overflow-hidden rounded-2xl ">
          <thead className="bg-primary text-center rounded-2xl overflow-hidden">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Email</th>
              <th className="p-3 ">Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="py-8 px-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden shadow-lg border border-amber-100 bg-primary/50 backdrop-blur-lg flex items-center justify-center">
                    {index + 1}
                  </div>
                </td>
                <td className="py-8 px-4 text-center">
                  <div className="rounded-full overflow-hidden shadow-sm border-b border-b-amber-100 bg-primary/50 backdrop-blur-lg flex items-center justify-center py-2">
                    {user.email}
                  </div>
                </td>
                <td className="py-8 px-4 text-center">
                  <div className="lg:rounded-full overflow-hidden shadow-sm border-b border-b-amber-100 bg-primary/50 backdrop-blur-lg flex items-center justify-center py-2 ">
                    {new Date(user.createdAt).toLocaleString("en-GB")}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay */}
      {!unlocked && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-start  justify-center z-50 w-full h-fu">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[320px] text-center mt-52">
            <h2 className="text-xl font-bold mb-4">Admin View</h2>

            <button
              onClick={() => setUnlocked(true)}
              className="w-full bg-black text-white py-2 rounded hover:opacity-90"
            >
              Reveal Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
