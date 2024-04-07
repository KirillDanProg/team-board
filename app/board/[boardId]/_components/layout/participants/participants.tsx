"use client";

import React from "react";
import UserAvatar from "./user-avatar";
import { useOthers } from "@/liveblocks.config";
import { useSelf } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute top-2 right-2 flex items-center justify-center gap-x-2 px-2 bg-white h-12 rounded-md shadow-md">
      {users.slice(0, MAX_SHOWN_USERS).map((user) => {
        return (
          <UserAvatar
            key={user.connectionId}
            src={user.info.avatar}
            name={user.info.userName}
            fallback={user.info.userName[0]}
            borderColor={connectionIdToColor(user.connectionId)}
          />
        );
      })}
      {currentUser && (
        <UserAvatar
          src={currentUser.info.avatar}
          name={currentUser.info.userName}
          fallback={currentUser.info.userName[0]}
          borderColor={connectionIdToColor(currentUser.connectionId)}
        />
      )}

      {hasMoreUsers && (
        <UserAvatar
          fallback={`+${users.length - MAX_SHOWN_USERS}`}
          name={`Еще ${users.length - MAX_SHOWN_USERS} `}
        />
      )}
    </div>
  );
}

export function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 right-2 flex items-center justify-center px-2 bg-white h-12 w-[120px] rounded-md shadow-md" />
  );
}

export default React.memo(Participants);
