from typing import Any, NewType

Man = NewType("Man", Any)
from typing import Any, NewType

Bear = NewType("Bear", Any)
from typing import Any, NewType

Pig = NewType("Pig", Any)
from typing import NewType, Union

OneOfBearManPigRIVnq1Ij = NewType("OneOfBearManPigRIVnq1Ij", Union[Man, Bear, Pig])
from typing import List, NewType
"""a bunch of pets
"""
Pets = NewType("Pets", List[OneOfBearManPigRIVnq1Ij])
