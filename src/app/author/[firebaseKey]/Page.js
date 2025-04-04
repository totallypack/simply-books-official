export default function PageName({ params }) {
  // inside component use
  const { firebaseKey } = params;
  return firebaseKey;
}
