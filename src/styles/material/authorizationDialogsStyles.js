import { makeStyles } from "@material-ui/core";

export const authorizationDialogsStyles = makeStyles(theme => ({
  dialogContentRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentDescription: {
    margin: '0',
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '20px',
    lineHeight: '26px',
    color: '#1C1C1C',
    '& span': {
      color: '#FF5C01',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  infoCheckingBlock: {
    margin: '16px 0 24px 0',
    borderBottom: '1px solid #F1EBE8',
  },
  markList: {
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '24px',
    '& span': {
      color: '#FF5C01',
    },
    '& ul': {
      padding: '0 16px',
      margin: 0,
      '& li': {
        margin: '8px 0',
      },
      '& li::marker': {
        color: '#A2A2A2',
      },
    },
  },
  checkboxBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderTop: '1px solid #F1EBE8',
    padding: '12px 0 16px 0',
  },
  checkboxBlockDescription: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 15,
    marginLeft: 24,
    width: '90%',
  },
  checkboxTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '90%',
  },
  title: {
    fontFamily: 'Museo Sans Cyrl Bold',
  },
  value: {
    maxWidth: '390px',
    marginTop: 8,
    overflowWrap: 'break-word',
    fontFamily: 'Museo Sans Cyrl Regular',
    [theme.breakpoints.down('sm')]: {
      width: '84%',
    },
  },
  button: {
    width: '187px',
    alignSelf: 'center',
  },
  checkbox: {
    padding: 0,
    height: 'fit-content',
  },
  contentBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #F1EBE8',
    marginTop: '32px',
    paddingTop: '32px',
    fontFamily: 'Museo Sans Cyrl Regular',
    '&>div': {
      width: '234px',
    },
    '& p': {
      margin: 0,
      fontSize: '20px',
    },
    '& span': {
      fontSize: '15px',
      fontFamily: 'Museo Sans Cyrl Bold',
    },
    [theme.breakpoints.down('sm')]: {
      '& span': {
        fontSize: '14px',
      },
      marginTop: '18px',
      paddingTop: '18px',
    },
  },
  notes: {
    marginTop: '12px',
    color: '#A2A2A2',
    fontSize: '15px',
    fontFamily: 'Museo Sans Cyrl Regular',
    lineHeight: '26px',
    '& a': {
      color: '#FF5C01',
      cursor: 'pointer',
      fontFamily: 'Museo Sans Cyrl Bold',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  link: {
    marginTop: '30px',
    color: '#FF5C01',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '18px',
  },
  loginInput: {
    display: 'flex',
    maxWidth: '375px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '26px',
    color: '#1C1C1C',
    '& a': {
      color: '#FF5C01',
      fontFamily: 'Museo Sans Cyrl Bold',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  marginTop: {
    marginTop: 120,
  },
  radioGroup: {
    padding: '20px 0',
    borderTop: `1px solid ${theme.palette.border.main}`,
    borderBottom: `1px solid ${theme.palette.border.main}`,
  }
}));
