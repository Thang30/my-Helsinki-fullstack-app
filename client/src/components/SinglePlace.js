// this script plays no role in the current applicationCache, just something written as experimenting before

import StringifyAndRemoveQuotes from "./common/StringifyProperties";

const Place = ({ place }) => {
  return (
    <li>
      Name: <span>&nbsp;</span>
      <StringifyAndRemoveQuotes anObject={place.name} />.<span>&nbsp;</span>{" "}
      Address:
      <span>&nbsp;</span>
      <StringifyAndRemoveQuotes
        anObject={place.location.address.street_address}
      />
      ,<span>&nbsp;</span>
      <StringifyAndRemoveQuotes anObject={place.location.address.postal_code} />
      ,<span>&nbsp;</span>
      <StringifyAndRemoveQuotes anObject={place.location.address.locality} />.
      <span>&nbsp;</span>
      Open now:
      <span>&nbsp;</span>
      <StringifyAndRemoveQuotes anObject={place.open_now} />.
    </li>
  );
};

export default Place;
