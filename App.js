import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const appsData = [
  { id: 1, name: "Facebook", category: "Social Media", rating: 4.5 },
  { id: 2, name: "Instagram", category: "Social Media", rating: 4.7 },
  { id: 3, name: "Spotify", category: "Music", rating: 4.8 },
  { id: 4, name: "Slack", category: "Productivity", rating: 4.3 },
];

export default function AppListing() {
  const [search, setSearch] = useState("");

  const filteredApps = appsData.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">App Listings</h1>
      <Input
        placeholder="Search apps..."
        className="mb-4 p-2 border rounded-md w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredApps.map((app) => (
          <Card key={app.id} className="p-4 shadow-lg rounded-lg">
            <CardContent>
              <h2 className="text-lg font-semibold">{app.name}</h2>
              <p className="text-gray-500">Category: {app.category}</p>
              <p className="text-yellow-500">⭐ {app.rating}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
