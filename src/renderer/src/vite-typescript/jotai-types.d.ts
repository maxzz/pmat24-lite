type PA<Value> = import("jotai").PrimitiveAtom<Value>;

type Getter = import("jotai").Getter;
type Setter = import("jotai").Setter;

type GetSet = { get: Getter; set: Setter; };
type GetOnly = { get: Getter; set?: Setter; };
type SetOnly = { get?: Getter; set: Setter; };
