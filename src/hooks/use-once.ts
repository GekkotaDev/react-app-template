type OnceAPI<TFunction extends (...args: any[]) => any[]> = [TFunction];

export const useOnce = <const TFunction extends (...args: any[]) => any>(
  callback: TFunction,
): OnceAPI<TFunction> => {
  const [result, setResult] = useState<ReturnType<TFunction>>(null!);
  const [used, setUsed] = useState(false);

  return [
    (...parameters) => {
      if (used) return result;
      setUsed(true);
      setResult(callback(...parameters));
      return result;
    },
  ] as OnceAPI<TFunction>;
};
