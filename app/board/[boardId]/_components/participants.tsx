"use client";

export default function Participants() {
  return (
    <div className="absolute top-2 right-2 flex items-center justify-center px-2 bg-white h-12 rounded-md shadow-md">
      Participants
    </div>
  );
}

Participants.Skeleton = function ParticipantsSekeleton() {
  return (
    <div className="absolute top-2 right-2 flex items-center justify-center px-2 bg-white h-12 w-[120px] rounded-md shadow-md" />
  );
};
