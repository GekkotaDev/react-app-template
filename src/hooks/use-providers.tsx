import type { JSX } from "react/jsx-runtime";

type Provider = ({ children }: { children: JSX.Element }) => JSX.Element;

const reducer =
  (Parent: Provider, Child: Provider) =>
  ({ children }: { children: JSX.Element }) =>
    Parent === undefined ? (
      <Child>{children}</Child>
    ) : (
      <Parent>
        <Child>{children}</Child>
      </Parent>
    );

const withNull: Provider = ({ children }) => <>{children}</>;

const withProviders = (...providers: Provider[]) =>
  providers.length ? providers.reduce(reducer) : withNull;

const withProvidersRight = (...providers: Provider[]) =>
  providers.length ? providers.reduceRight(reducer) : withNull;

export const useProviders = Object.assign(withProviders, {
  right: withProvidersRight,
});

export const MultiProvider = ({
  providers,
  children,
  right,
}: {
  providers: Provider[];
  children: JSX.Element;
  right?: boolean;
}) => {
  const Provider = right ? useProviders.right(...providers) : useProviders(...providers);

  return <Provider>{children}</Provider>;
};
