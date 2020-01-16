from typing import NewType

Foo = NewType("Foo", str)
from typing import NewType

Baz = NewType("Baz", bool)
from typing import TypedDict, Optional

class ObjectOfBazX101YId8(TypedDict):
    ripslip: Optional[Baz]
from typing import List, NewType
"""array of strings is all...
"""
UnorderedSetOfFooz1UBFn8B = NewType("UnorderedSetOfFooz1UBFn8B", List[Foo])
from typing import NewType

Bar = NewType("Bar", int)
from typing import NewType, Tuple

BunchaNumbers = NewType("BunchaNumbers", Tuple[Bar])
from typing import NewType, Union

OneOfStuff = NewType("OneOfStuff", Union[UnorderedSetOfFooz1UBFn8B, BunchaNumbers])
from typing import NewType, Union
"""Generated! Represents an alias to any of the provided schemas
"""
AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar = NewType("AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar", Union[Foo, ObjectOfBazX101YId8, OneOfStuff, Bar])
