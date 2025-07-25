"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 px-4 pb-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data} />
      {data.length === 0 && (
        <EmptyState
          title="Create Your First Agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  )
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we fetch the agents data."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="There was an error loading the agents data."
    />
  );
};
