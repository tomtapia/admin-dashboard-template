import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { TableSkeleton } from "@/components/shared/skeletons";
import { StatePanel } from "@/components/shared/state-panel";
import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users/users-table";
import { getUsersRequest } from "@/features/users/users-api";
import type { UserRecord } from "@/types";

export const UsersPage = () => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const usersQuery = useQuery<UserRecord[]>({
    queryKey: ["users", deferredSearch],
    queryFn: () => getUsersRequest(deferredSearch) as Promise<UserRecord[]>,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Users"
        title="Access control and roster visibility for operational teams."
        description="A compact roster with visible follow-up actions, better table density and cleaner admin hierarchy."
        actions={
          <>
            <Button variant="outline" className="w-full md:w-auto">
              Export roster
            </Button>
            <Button className="w-full md:w-auto">Invite user</Button>
          </>
        }
      />

      <SearchFilterBar value={search} onChange={setSearch} resultCount={usersQuery.data?.length} />

      {usersQuery.isLoading ? <TableSkeleton /> : null}

      {usersQuery.isError ? (
        <StatePanel
          kind="error"
          title="Users unavailable"
          description="The mock user directory did not respond."
          onRetry={() => void usersQuery.refetch()}
        />
      ) : null}

      {usersQuery.data && usersQuery.data.length > 0 ? (
        <UsersTable users={usersQuery.data} />
      ) : null}

      {usersQuery.data && usersQuery.data.length === 0 ? (
        <EmptyState
          title="No users match this search"
          description="Try a broader query or reset the filter to reveal the full demo dataset."
        />
      ) : null}
    </div>
  );
};
