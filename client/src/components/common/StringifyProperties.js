// this script plays no role in the current applicationCache, just something written as experimenting before

const StringifyAndRemoveQuotes = ({ anObject, replacer = null, space = 2 }) => (
  <span>{JSON.stringify(anObject, replacer, space).replace(/['"]+/g, "")}</span>
);

export default StringifyAndRemoveQuotes;
