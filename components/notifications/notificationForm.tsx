import React from "react";
import SearchBar from "../notifications/searchBar";
import { examYearDetails } from "@/constants/examyear";
import { degrees } from "@/constants/degree";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, GraduationCap, FileText } from "lucide-react";

const NotificationForm = ({
  handleChangeParams,
}: {
  handleChangeParams: (param: string, event: any) => void;
}) => {
  const regulations = ["R16", "R19", "R20", "R23"];

  return (
    <Card className="p-6 mb-6 bg-white dark:bg-gray-800 shadow-sm">
      <div className="space-y-4">
        {/* Search Bar */}
        <div>
          <Label className="text-base font-semibold mb-2 block">Search Notifications</Label>
          <div className="relative">
            <SearchBar
              handleSearch={(event) => {
                handleChangeParams("title", event);
              }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Select
                onValueChange={(value) => {
                  const event = { target: { value } } as any;
                  handleChangeParams("year", event);
                }}
              >
                <SelectTrigger className="h-8 w-24 text-xs border-l rounded-l-none">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(examYearDetails)
                    .reverse()
                    .map((examYearKey) => (
                      <SelectItem value={examYearKey} key={examYearKey}>
                        {examYearDetails[examYearKey]}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="degree" className="text-sm font-semibold flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-500" />
              Degree
            </Label>
            <Select
              onValueChange={(value) => {
                const event = { target: { value } } as any;
                handleChangeParams("degree", event);
              }}
            >
              <SelectTrigger id="degree" className="h-12">
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(degrees)
                  .filter((degree) => ["B.Tech", "B.Pharmacy", "M.Tech", "M.B.A", "M.C.A"].includes(degree))
                  .map((degree) => (
                    <SelectItem value={degrees[degree]} key={degree}>
                      {degree}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regulation" className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" />
              Regulation
            </Label>
            <Select
              onValueChange={(value) => {
                const event = { target: { value } } as any;
                handleChangeParams("regulation", event);
              }}
            >
              <SelectTrigger id="regulation" className="h-12">
                <SelectValue placeholder="Select Regulation" />
              </SelectTrigger>
              <SelectContent>
                {regulations.map((regulation: string, index: number) => (
                  <SelectItem value={regulation} key={index}>
                    {regulation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationForm;
