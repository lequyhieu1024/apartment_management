import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl
  },
  stackHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.md
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm
  },
  form: {
    gap: Spacing.sm
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md
  },
  inputIcon: {
    marginRight: Spacing.sm
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: Colors.text
  },
  inputError: {
    borderColor: 'red'
  },
  roleContainer: {
    marginTop: Spacing.sm
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm
  },
  roleOption: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border
  },
  roleOptionSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary
  },
  roleOptionText: {
    fontSize: 14,
    color: Colors.text
  },
  roleOptionTextSelected: {
    color: Colors.primary,
    fontWeight: '600'
  },
  registerButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md
  },
  registerButtonDisabled: {
    backgroundColor: Colors.neutral[400]
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  loginText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: Spacing.lg
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: '600'
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md
  },
  loginButtonDisabled: {
    backgroundColor: Colors.neutral[400]
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  registerText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: Spacing.lg
  },
  registerLink: {
    color: Colors.primary,
    fontWeight: '600'
  },
  demoAccounts: {
    backgroundColor: Colors.neutral[50],
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xl
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm
  },
  demoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2
  },
  errorMsg: {
    marginTop: 4,
    marginLeft: 2,
    color: 'red',
    fontSize: 12
  },
  summary: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.sm
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.xs
  },
  summaryLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  tabSelected: {
    borderBottomColor: Colors.primary
  },
  tabText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500'
  },
  tabTextSelected: {
    color: Colors.primary,
    fontWeight: '600'
  },
  paymentList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl
  },
  paymentCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md
  },
  adminInfo: {
    flex: 1
  },
  adminName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs
  },
  adminEmail: {
    fontSize: 12,
    color: Colors.textSecondary
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm
  },
  statusText: {
    fontSize: 9,
    fontWeight: 'bold'
  },
  paymentDetails: {
    marginBottom: Spacing.md
  },
  paymentAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs
  },
  amountLabel: {
    fontSize: 13,
    color: Colors.textSecondary
  },
  amountValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text
  },
  paymentPeriod: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  periodLabel: {
    fontSize: 13,
    color: Colors.textSecondary
  },
  periodValue: {
    fontSize: 13,
    color: Colors.text
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm
  },
  buildingInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buildingText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginLeft: Spacing.xs
  },
  dueDate: {
    fontSize: 11,
    color: Colors.textMuted
  },
  paidInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border
  },
  paidText: {
    fontSize: 11,
    color: Colors.success,
    marginLeft: Spacing.xs
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  featuresWrapper: {
    flexDirection: 'column',
    marginTop: 4
  },
  featureItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6
  },
  keyText: {
    flexShrink: 0,
    fontWeight: '500',
    marginRight: 4,
    color: '#333'
  },
  valueText: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#555'
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm
  },
  pickerButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: Colors.primaryDark,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginBottom: 16,
    marginTop: -12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.primaryDark,
  },
  pickerList: {
    marginBottom: 16,
  },
  pickerItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerItemText: {
    fontSize: 16,
    color: Colors.primaryDark,
  },
});