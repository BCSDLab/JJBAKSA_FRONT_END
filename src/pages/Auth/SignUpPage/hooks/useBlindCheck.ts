import { useState } from 'react';

export default function useBlindCheck() {
  const [isPwBlind, setIsPwBlind] = useState(false);
  const [isPwchBlind, setIsPwchBlind] = useState(false);

  return {
    isPwBlind, isPwchBlind, setIsPwBlind, setIsPwchBlind,
  };
}
