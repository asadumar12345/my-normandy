import { colors } from "../../utils/colors";

export const styles = {
  outerContainer: { display: "flex", flexDirection: "column", width: "100%" },

  smallCardContainer: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    background: colors.white,
    marginTop : 8,
    borderRadius: 4,
    // width: "100%",
  },

  cardTitle: { fontSize: 14, fontWeight: 500, color: colors.black },

  detailBtn: {
    padding: 0,
    fontSize: 12,
    fontWeight: 600,
    color: colors.secondaryBlue,
  },

  approvalBtnContainer: {
    background: colors.red300 , padding : 10 , borderRadius: 500
  },

  detailsContainer: { background: colors.white  },

  title: { fontSize: 12, fontWeight: 600, color: colors.grey900 },

  text: { fontSize: 14, fontWeight: 400, color: colors.grey500 },

  detailItemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
};
