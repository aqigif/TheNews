import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/theme';

import { Input } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

import useNewsHandler from './News.handler';

function News() {
  const { t } = useTranslation();

  const { fonts, layout, colors, gutters, borders } = useTheme();
  const {
    data,
    isLoading,
    tempKeyword,
    setTempKeyword,
    isFetched,
    onSearch,
    isError,
    error,
  } = useNewsHandler();

  return (
    <SafeScreen>
      <View
        style={[
          isFetched ? layout.itemsStart : layout.itemsCenter,
          gutters.paddingHorizontal_12,
          gutters.marginBottom_12,
        ]}
      >
        <Text
          style={
            isFetched
              ? [
                  fonts.size_24,
                  fonts.gray800,
                  fonts.bold,
                  gutters.marginBottom_12,
                ]
              : [
                  fonts.size_40,
                  fonts.gray800,
                  fonts.bold,
                  fonts.alignCenter,
                  gutters.marginBottom_24,
                ]
          }
        >
          {t('screen_news.title')}
        </Text>
        <View
          style={
            isFetched
              ? [layout.row, layout.fullWidth]
              : [layout.fullWidth, gutters.gap_12]
          }
        >
          <Input
            onChangeText={setTempKeyword}
            placeholder={t('screen_news.description')}
            style={isFetched ? [layout.flex_1] : []}
            textAlign={isFetched ? 'left' : 'center'}
            value={tempKeyword}
          />
          <TouchableOpacity
            onPress={onSearch}
            style={[
              isFetched ? {} : layout.fullWidth,
              gutters.paddingVertical_12,
              gutters.paddingHorizontal_12,
              borders.rounded_4,
              { backgroundColor: colors.gray800 },
            ]}
          >
            <Text style={[fonts.alignCenter, { color: colors.gray100 }]}>
              {isFetched
                ? t('screen_news.find.short')
                : t('screen_news.find.full')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" />
          ) : isError ? (
            <View
              style={[
                layout.flex_1,
                layout.row,
                gutters.paddingHorizontal_12,
                gutters.marginTop_12,
                gutters.marginBottom_12,
                gutters.gap_12,
              ]}
            >
              <Text>{error?.message}</Text>
            </View>
          ) : isFetched && !data?.length ? (
            <View
              style={[
                layout.flex_1,
                layout.row,
                gutters.paddingHorizontal_12,
                gutters.marginTop_12,
                gutters.marginBottom_12,
                gutters.gap_12,
              ]}
            >
              <Text>No Results Found</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View
            style={[
              layout.flex_1,
              layout.row,
              gutters.paddingHorizontal_12,
              gutters.marginTop_12,
              gutters.marginBottom_12,
              gutters.gap_12,
            ]}
          >
            <View style={[layout.flex_1, { gap: 4 }]}>
              <Text style={[fonts.bold, fonts.size_16]}>{item.title}</Text>
              <Text style={[fonts.size_12]}>{item.description}</Text>
            </View>
            {item?.urlToImage && (
              <Image
                height={100}
                source={{ uri: item?.urlToImage }}
                style={{ borderRadius: 10 }}
                width={100}
              />
            )}
          </View>
        )}
      />
    </SafeScreen>
  );
}

export default News;
