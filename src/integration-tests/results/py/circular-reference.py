from typing import NewType, Any, Mapping

CircularRefs = NewType("CircularRefs", Mapping[Any, Any])
