from typing import TypedDict, Optional

class CircularRefs(TypedDict):
    LeFoo: Optional[CircularRefs]
