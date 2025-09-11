import React from "react";

export function ErrorMessage({message}: {message: Error}) {
  return <p className="text-center bg-red-500">{message.message}</p>
}