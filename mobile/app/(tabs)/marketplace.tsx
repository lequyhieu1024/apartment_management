import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
} from 'react-native';
import {Colors} from '@/constants/colors';
import {Spacing, BorderRadius} from '@/constants/spacing';
import {Search, Plus, Filter, Grid2x2 as Grid, List} from 'lucide-react-native';
import type {Product, MarketplaceCategory} from '@/types/marketplace';

const categories: MarketplaceCategory[] = [
    {id: '1', name: 'Điện tử', icon: '📱', color: Colors.primary},
    {id: '2', name: 'Nội thất', icon: '🪑', color: Colors.secondary},
    {id: '3', name: 'Xe cộ', icon: '🚗', color: Colors.accent},
    {id: '4', name: 'Thời trang', icon: '👔', color: Colors.warning},
    {id: '5', name: 'Sách vở', icon: '📚', color: Colors.success},
    {id: '6', name: 'Khác', icon: '📦', color: Colors.neutral[500]},
];

const mockProducts: Product[] = [
    {
        id: '1',
        title: 'Tủ lạnh Samsung 300L',
        description: 'Tủ lạnh mới 95%, còn bảo hành 2 năm',
        price: 8500000,
        images: ['https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400'],
        seller_id: 'user1',
        seller_name: 'Nguyễn Thị B',
        building_id: 'building1',
        category: 'Điện tử',
        condition: 'excellent',
        status: 'available',
        created_at: '2025-01-10T10:00:00Z',
    },
    {
        id: '2',
        title: 'Xe đạp điện Yamaha',
        description: 'Xe đạp điện còn mới, ít sử dụng',
        price: 12000000,
        images: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400'],
        seller_id: 'user2',
        seller_name: 'Trần Văn C',
        building_id: 'building1',
        category: 'Xe cộ',
        condition: 'used',
        status: 'available',
        created_at: '2025-01-09T15:30:00Z',
    },
    {
        id: '3',
        title: 'Sofa góc L',
        description: 'Sofa màu be, rất êm và thoải mái',
        price: 5500000,
        images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'],
        seller_id: 'user3',
        seller_name: 'Lê Thị D',
        building_id: 'building1',
        category: 'Nội thất',
        condition: 'used',
        status: 'available',
        created_at: '2025-01-08T09:15:00Z',
    },
];

export default function MarketplaceScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const ProductCard = ({product}: { product: Product }) => (
        <TouchableOpacity style={styles.productCard}>
            <Image source={{uri: product.images[0]}} style={styles.productImage}/>
            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                    {product.title}
                </Text>
                <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
                <Text style={styles.sellerName}>Bởi {product.seller_name}</Text>
                <View style={[styles.conditionBadge, getConditionStyle(product.condition)]}>
                    <Text style={[styles.conditionText, getConditionTextStyle(product.condition)]}>
                        {getConditionLabel(product.condition)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const getConditionStyle = (condition: string) => {
        switch (condition) {
            case 'new':
                return {backgroundColor: Colors.success + '20'};
            case 'excellent':
                return {backgroundColor: Colors.primary + '20'};
            case 'used':
                return {backgroundColor: Colors.warning + '20'};
            default:
                return {backgroundColor: Colors.neutral[200]};
        }
    };

    const getConditionTextStyle = (condition: string) => {
        switch (condition) {
            case 'new':
                return {color: Colors.success};
            case 'excellent':
                return {color: Colors.primary};
            case 'used':
                return {color: Colors.warning};
            default:
                return {color: Colors.neutral[600]};
        }
    };

    const getConditionLabel = (condition: string) => {
        switch (condition) {
            case 'new':
                return 'MỚI';
            case 'excellent':
                return 'RẤT TỐT';
            case 'used':
                return 'ĐÃ SỬ DỤNG';
            default:
                return condition.toUpperCase();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Chợ chung cư</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Plus size={20} color={Colors.background}/>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={18} color={Colors.textMuted}/>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={Colors.textMuted}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Filter size={18} color={Colors.primary}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.viewModeButton}
                    onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                    {viewMode === 'grid' ?
                        <List size={18} color={Colors.primary}/> :
                        <Grid size={18} color={Colors.primary}/>
                    }
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={styles.categoriesContent}
            >
                <TouchableOpacity
                    style={[styles.categoryChip, !selectedCategory && styles.categoryChipSelected]}
                    onPress={() => setSelectedCategory(null)}
                >
                    <Text style={[styles.categoryText, !selectedCategory && styles.categoryTextSelected]}>
                        Tất cả
                    </Text>
                </TouchableOpacity>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryChip,
                            selectedCategory === category.id && styles.categoryChipSelected
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                    >
                        <Text style={styles.categoryEmoji}>{category.icon}</Text>
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === category.id && styles.categoryTextSelected
                        ]}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={mockProducts}
                renderItem={({item}) => <ProductCard product={item}/>}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
    },
    addButton: {
        backgroundColor: Colors.primary,
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        gap: Spacing.sm,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    searchInput: {
        flex: 1,
        height: 44,
        marginLeft: Spacing.sm,
        fontSize: 14,
        color: Colors.text,
    },
    filterButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    viewModeButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    categoriesContainer: {
        maxHeight: 50,
        marginBottom: Spacing.md,
    },
    categoriesContent: {
        paddingHorizontal: Spacing.lg,
        gap: Spacing.sm,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    categoryChipSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    categoryEmoji: {
        fontSize: 14,
        marginRight: Spacing.xs,
    },
    categoryText: {
        fontSize: 12,
        color: Colors.text,
        fontWeight: '500',
    },
    categoryTextSelected: {
        color: Colors.background,
    },
    productList: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
    productRow: {
        gap: Spacing.md,
    },
    productCard: {
        flex: 1,
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    productImage: {
        width: '100%',
        height: 120,
    },
    productInfo: {
        padding: Spacing.sm,
    },
    productTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.accent,
        marginBottom: Spacing.xs,
    },
    sellerName: {
        fontSize: 11,
        color: Colors.textMuted,
        marginBottom: Spacing.xs,
    },
    conditionBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: Spacing.xs,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    conditionText: {
        fontSize: 9,
        fontWeight: 'bold',
    },
});