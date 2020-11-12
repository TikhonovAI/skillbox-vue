<template>
  <BaseFormField :title="title" :error="error">
              <input class="form__input" v-model="dataValue" :type="type" name="name"
               :placeholder="placeholder">
            </BaseFormField>
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin';

export default {
  mixins: [FormFieldMixin],
};
</script>
